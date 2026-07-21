#!/usr/bin/env node
/**
 * Lightweight link audit for the Jimmy Manalel Vite SPA.
 * - Scans source files for href/src destinations
 * - Validates local hash targets exist in source
 * - Validates built asset paths for relative URLs
 * - Optionally checks external URLs with timeouts
 *
 * Exit codes:
 *  0 = no confirmed broken internal links
 *  1 = broken internal links or empty/placeholder hrefs found
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const checkExternal = process.argv.includes("--external");
const timeoutMs = 8000;

const SOURCE_GLOBS = ["src", "index.html", "public"];
const HREF_RE = /(?:href|src)\s*=\s*["']([^"']+)["']/gi;
const ID_RE = /\bid\s*=\s*["']([^"']+)["']/gi;

const PLACEHOLDER_HREFS = new Set(["#", "", "javascript:void(0)", "javascript:;"]);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "dist" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(tsx?|jsx?|html|css|md|mjs|cjs|json)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

function collectFiles() {
  const files = [];
  for (const item of SOURCE_GLOBS) {
    const full = path.join(root, item);
    if (fs.existsSync(full) && fs.statSync(full).isDirectory()) walk(full, files);
    else if (fs.existsSync(full)) files.push(full);
  }
  return files;
}

function extractIds(files) {
  const ids = new Set();
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    let match;
    while ((match = ID_RE.exec(text))) {
      ids.add(match[1]);
    }
  }
  return ids;
}

function extractLinks(files) {
  const links = [];
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    let match;
    while ((match = HREF_RE.exec(text))) {
      links.push({ href: match[1].trim(), file: path.relative(root, file) });
    }
  }
  return links;
}

function isExternal(href) {
  return /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

async function checkExternalUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "jimmymanalel-link-check/1.0" },
    });
    if (res.status === 405 || res.status === 403 || res.status === 999) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "jimmymanalel-link-check/1.0" },
      });
    }
    return { ok: res.status >= 200 && res.status < 400, status: res.status, finalUrl: res.url };
  } catch (error) {
    return { ok: false, status: 0, error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timer);
  }
}

function publicExists(relPath) {
  const cleaned = relPath.split("?")[0].split("#")[0];
  if (cleaned === "/" || cleaned === "") return true;
  const candidates = [
    path.join(root, "public", cleaned),
    path.join(root, "dist", cleaned),
    path.join(root, cleaned.replace(/^\//, "")),
  ];
  return candidates.some((p) => fs.existsSync(p));
}

async function main() {
  console.log("\nJimmy Manalel link check\n------------------------");

  const files = collectFiles();
  const ids = extractIds(files);
  const links = extractLinks(files);

  const brokenInternal = [];
  const placeholders = [];
  const redirects = [];
  const externalIssues = [];
  const externalOk = [];

  for (const { href, file } of links) {
    if (PLACEHOLDER_HREFS.has(href) || href.toLowerCase().startsWith("javascript:")) {
      placeholders.push({ href, file });
      continue;
    }

    if (href.startsWith("mailto:")) {
      const email = href.slice("mailto:".length).split("?")[0];
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        brokenInternal.push({ href, file, reason: "Malformed mailto address" });
      }
      continue;
    }

    if (href.startsWith("tel:")) continue;

    if (isExternal(href)) {
      if (!checkExternal) continue;
      const absolute = href.startsWith("//") ? `https:${href}` : href;
      const result = await checkExternalUrl(absolute);
      if (result.ok) {
        if (result.finalUrl && result.finalUrl !== absolute) {
          redirects.push({ href, file, finalUrl: result.finalUrl, status: result.status });
        } else {
          externalOk.push({ href, file, status: result.status });
        }
      } else {
        externalIssues.push({
          href,
          file,
          status: result.status,
          error: result.error || "Unreachable or non-2xx/3xx response",
        });
      }
      continue;
    }

    // Hash-only links
    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (!id) {
        placeholders.push({ href, file });
      } else if (!ids.has(id)) {
        brokenInternal.push({ href, file, reason: `Missing element id="${id}"` });
      }
      continue;
    }

    // Root-relative paths
    if (href.startsWith("/")) {
      const [pathname, hash] = href.split("#");
      if (pathname === "/" || pathname === "") {
        // homepage ok
      } else if (!publicExists(pathname)) {
        // Known single-page site: non-home paths are expected 404 destinations,
        // not in-app routes. Flag only if they look like static assets.
        if (/\.[a-z0-9]+$/i.test(pathname)) {
          brokenInternal.push({ href, file, reason: "Missing static asset" });
        }
      }
      if (hash && !ids.has(hash)) {
        brokenInternal.push({ href, file, reason: `Missing element id="${hash}"` });
      }
    }
  }

  console.log(`Scanned files: ${files.length}`);
  console.log(`Known element ids: ${ids.size}`);
  console.log(`Links found: ${links.length}`);

  if (placeholders.length) {
    console.log(`\nPlaceholder / empty hrefs (${placeholders.length}):`);
    for (const item of placeholders) {
      console.log(`  ✗ ${item.href || "(empty)"}  ← ${item.file}`);
    }
  } else {
    console.log("\nPlaceholder / empty hrefs: none");
  }

  if (brokenInternal.length) {
    console.log(`\nBroken internal links (${brokenInternal.length}):`);
    for (const item of brokenInternal) {
      console.log(`  ✗ ${item.href}  ← ${item.file} (${item.reason})`);
    }
  } else {
    console.log("Broken internal links: none");
  }

  if (checkExternal) {
    console.log(`\nExternal OK: ${externalOk.length}`);
    if (redirects.length) {
      console.log(`External redirects (${redirects.length}):`);
      for (const item of redirects) {
        console.log(`  → ${item.href} => ${item.finalUrl} [${item.status}]  ← ${item.file}`);
      }
    }
    if (externalIssues.length) {
      console.log(`External issues (${externalIssues.length}) — manual review recommended:`);
      for (const item of externalIssues) {
        console.log(
          `  ? ${item.href}  ← ${item.file} (${item.status || "n/a"}${item.error ? ` ${item.error}` : ""})`
        );
      }
    } else {
      console.log("External issues: none");
    }
  } else {
    console.log("\nExternal checks skipped (pass --external to enable).");
  }

  const failed = brokenInternal.length > 0 || placeholders.length > 0;
  console.log(failed ? "\nResult: FAIL\n" : "\nResult: PASS\n");
  process.exit(failed ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
