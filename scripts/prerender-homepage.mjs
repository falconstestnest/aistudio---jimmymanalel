#!/usr/bin/env node
/**
 * Build-time homepage prerender via Vite SSR + JSDOM.
 * Injects rendered App HTML into dist/index.html #root.
 * Runtime still uses createRoot (not hydrateRoot) — no hydration mismatch.
 * Leaves dist/404.html untouched. No SPA rewrites.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";
import { renderToString } from "react-dom/server";
import React from "react";
import { JSDOM } from "jsdom";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distIndex = path.join(root, "dist", "index.html");
const dist404 = path.join(root, "dist", "404.html");

function installDom() {
  const dom = new JSDOM("<!doctype html><html><body></body></html>", {
    url: "https://www.jimmymanalel.com/",
    pretendToBeVisual: true,
  });

  const { window } = dom;

  // Attach DOM globals expected by React / motion.
  const assign = [
    "document",
    "HTMLElement",
    "Element",
    "Node",
    "DocumentFragment",
    "SVGElement",
    "MutationObserver",
    "getComputedStyle",
    "requestAnimationFrame",
    "cancelAnimationFrame",
    "HTMLDivElement",
    "HTMLSpanElement",
    "HTMLAnchorElement",
    "HTMLButtonElement",
    "HTMLInputElement",
    "HTMLTextAreaElement",
    "HTMLFormElement",
    "Event",
    "CustomEvent",
  ];

  for (const key of assign) {
    if (key in window) {
      try {
        globalThis[key] = window[key];
      } catch {
        // Some Node globals are read-only; ignore.
      }
    }
  }

  // window / navigator / self can be non-writable on newer Node versions.
  try {
    globalThis.window = window;
  } catch {
    Object.defineProperty(globalThis, "window", { value: window, configurable: true });
  }
  try {
    globalThis.self = window;
  } catch {
    /* ignore */
  }
  try {
    Object.defineProperty(globalThis, "navigator", {
      value: window.navigator,
      configurable: true,
    });
  } catch {
    /* ignore */
  }

  // Storage
  const memory = new Map();
  const storage = {
    getItem: (k) => (memory.has(k) ? memory.get(k) : null),
    setItem: (k, v) => memory.set(String(k), String(v)),
    removeItem: (k) => memory.delete(k),
    clear: () => memory.clear(),
    key: (i) => Array.from(memory.keys())[i] ?? null,
    get length() {
      return memory.size;
    },
  };
  Object.defineProperty(window, "localStorage", { value: storage, configurable: true });
  Object.defineProperty(window, "sessionStorage", { value: storage, configurable: true });
  globalThis.localStorage = storage;
  globalThis.sessionStorage = storage;

  window.matchMedia =
    window.matchMedia ||
    (() => ({
      matches: false,
      media: "",
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {
        return false;
      },
    }));
  globalThis.matchMedia = window.matchMedia.bind(window);

  // ResizeObserver stub used by some layout libraries
  if (!window.ResizeObserver) {
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  globalThis.ResizeObserver = window.ResizeObserver;

  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  globalThis.IntersectionObserver = window.IntersectionObserver;

  return dom;
}

function injectIntoRoot(templateHtml, appHtml) {
  // Match only the empty Vite shell root (avoid truncating on nested </div>).
  const emptyRoot = /<div id="root"><\/div>/;
  if (!emptyRoot.test(templateHtml)) {
    // Already filled or unexpected shape — replace from root open to end of body carefully.
    if (!/<div id="root"[^>]*>/.test(templateHtml)) {
      throw new Error("dist/index.html is missing #root");
    }
    return templateHtml.replace(
      /<div id="root"[^>]*>[\s\S]*<\/div>\s*<\/body>/,
      `<div id="root">${appHtml}</div>\n  </body>`
    );
  }
  return templateHtml.replace(emptyRoot, `<div id="root">${appHtml}</div>`);
}

async function main() {
  if (!fs.existsSync(distIndex)) {
    throw new Error("dist/index.html not found. Run vite build first.");
  }

  const before404 = fs.existsSync(dist404) ? fs.readFileSync(dist404, "utf8") : null;
  const dom = installDom();

  const vite = await createViteServer({
    root,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });

  try {
    const mod = await vite.ssrLoadModule("/src/App.tsx");
    const App = mod.default;
    if (!App) throw new Error("Failed to load App default export");

    let appHtml;
    try {
      appHtml = renderToString(React.createElement(App));
    } catch (error) {
      console.error("renderToString failed. Browser APIs or component SSR incompatibility detected.");
      throw error;
    }

    if (!appHtml || appHtml.length < 200) {
      throw new Error(`Prerender produced unexpectedly short HTML (${appHtml?.length || 0} chars)`);
    }

    const hasH1 = /<h1[\s>]/i.test(appHtml);
    const hasHero =
      appHtml.includes("Venture corridor builder connecting") ||
      appHtml.includes("venture corridor builder connecting");
    if (!hasH1 || !hasHero) {
      throw new Error("Prerender output missing expected homepage H1 content");
    }

    const template = fs.readFileSync(distIndex, "utf8");
    // Guard: do not allow homepage metadata to be written into 404
    if (before404 && /og:url/.test(before404) && /jimmymanalel\.com\/\"/.test(before404) && !/noindex/.test(before404)) {
      // only warn — 404 should remain noindex without homepage og tags
    }

    const next = injectIntoRoot(template, appHtml);

    // Sanity: metadata still present once
    const titleCount = (next.match(/<title>/gi) || []).length;
    const canonicalCount = (next.match(/rel="canonical"/gi) || []).length;
    const robotsIndex = /name="robots"\s+content="index, follow"/i.test(next);
    if (titleCount !== 1) throw new Error(`Expected 1 <title>, found ${titleCount}`);
    if (canonicalCount !== 1) throw new Error(`Expected 1 canonical, found ${canonicalCount}`);
    if (!robotsIndex) throw new Error("Homepage robots index,follow missing after prerender");

    fs.writeFileSync(distIndex, next, "utf8");

    if (before404 !== null) {
      const after404 = fs.readFileSync(dist404, "utf8");
      if (after404 !== before404) {
        throw new Error("prerender-homepage unexpectedly modified dist/404.html");
      }
      if (!/noindex,\s*follow/i.test(after404)) {
        throw new Error("dist/404.html missing noindex, follow");
      }
      if (/rel="canonical"/i.test(after404)) {
        throw new Error("dist/404.html must not have a canonical tag");
      }
    }

    // Fail the build if build-relative booking dates leaked into the shell.
    const bookingIsoDates = appHtml.match(/\b20\d{2}-\d{2}-\d{2}\b/g) || [];
    const bookingHumanDates =
      appHtml.match(/\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\b/g) ||
      [];
    if (bookingIsoDates.length || bookingHumanDates.length) {
      throw new Error(
        `Prerender must not embed live booking dates. Found: ${[
          ...bookingIsoDates,
          ...bookingHumanDates,
        ].join(", ")}`
      );
    }
    if (!appHtml.includes("Loading current availability")) {
      throw new Error(
        'Prerender booking section must show the neutral "Loading current availability…" state'
      );
    }
    if (appHtml.includes("opacity:0") || appHtml.includes("opacity: 0")) {
      throw new Error("Prerender output contains opacity:0 content");
    }

    console.log("Prerender complete:");
    console.log(`  injected HTML: ${appHtml.length} chars`);
    console.log(`  H1 present: ${hasH1}`);
    console.log(`  hero copy present: ${hasHero}`);
    console.log(`  title tags: ${titleCount}`);
    console.log(`  canonical tags: ${canonicalCount}`);
    console.log(`  booking dates suppressed: yes`);
    console.log(`  404.html preserved: ${before404 !== null ? "yes" : "n/a"}`);
  } finally {
    await vite.close();
    dom.window.close();
  }
}

main().catch((error) => {
  console.error("Prerender failed:", error);
  process.exit(1);
});
