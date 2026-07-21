#!/usr/bin/env node
/**
 * Build-time multi-route prerender via Vite SSR + JSDOM + React Router.
 * Generates route-specific HTML shells under dist/ for approved public paths.
 * Runtime still uses createRoot (not hydrateRoot). Leaves dist/404.html untouched.
 * No catch-all SPA rewrites.
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
const distDir = path.join(root, "dist");
const distIndex = path.join(distDir, "index.html");
const dist404 = path.join(distDir, "404.html");
const SITE_ORIGIN = "https://www.jimmymanalel.com";

const ROUTES = [
  {
    path: "/",
    out: "index.html",
    title: "Jimmy Manalel | Venture Corridor Builder & Cross-Border Startup Strategist",
    description:
      "Jimmy Manalel is a venture corridor builder and cross-border startup strategist helping founders with investor narratives, GCC market entry, commerce infrastructure, and India–Middle East venture corridors.",
    robots: "index, follow",
    h1MustInclude: "Venture corridor builder connecting",
  },
  {
    path: "/about",
    out: "about/index.html",
    title: "About Jimmy Manalel | Founder Journey & Cross-Border Work",
    description:
      "About Jimmy Manalel: banking roots, co-founding Plantshop.ae, 500 Global accelerator experience, and work building India–GCC venture corridors for founders.",
    robots: "index, follow",
    h1MustInclude: "About Jimmy Manalel",
  },
  {
    path: "/venture-tools",
    out: "venture-tools/index.html",
    title: "Founder Strategy Tools | Jimmy Manalel",
    description:
      "Free founder strategy tools from Jimmy Manalel: corridor dialogue, startup narrative grading, and commerce infrastructure analytics.",
    robots: "index, follow",
    h1MustInclude: "Founder strategy tools",
  },
  {
    path: "/venture-tools/dialogue",
    out: "venture-tools/dialogue/index.html",
    title: "Founder Strategy Dialogue | Jimmy Manalel",
    description:
      "Corridor Dialogue — a founder strategy conversation tool to pressure-test positioning, expansion logic, and venture narrative clarity.",
    robots: "index, follow",
    h1MustInclude: "Corridor Dialogue",
  },
  {
    path: "/venture-tools/narrative-grader",
    out: "venture-tools/narrative-grader/index.html",
    title: "Startup Narrative Grader | Jimmy Manalel",
    description:
      "Score and strengthen your investor narrative with Jimmy Manalel’s startup narrative grader — clarity, fundability, and corridor positioning.",
    robots: "index, follow",
    h1MustInclude: "Narrative Grader",
  },
  {
    path: "/venture-tools/commerce-infrastructure-audit",
    out: "venture-tools/commerce-infrastructure-audit/index.html",
    title: "Commerce Infrastructure Audit Tool | Jimmy Manalel",
    description:
      "Interactive store economics diagnostics: logistics ratio, LTV/CAC, and projected contribution using unit-economics thinking from e-commerce operations.",
    robots: "index, follow",
    h1MustInclude: "Commerce Infrastructure Audit",
  },
  {
    path: "/strategy-conversation",
    out: "strategy-conversation/index.html",
    title: "Request a Strategy Conversation | Jimmy Manalel",
    description:
      "Request a strategy conversation with Jimmy Manalel about founder strategy, investor narrative, GCC expansion, or commerce infrastructure. This is a request, not an automatic booking.",
    robots: "index, follow",
    h1MustInclude: "Request a strategy conversation",
  },
  {
    path: "/advisory",
    out: "advisory/index.html",
    title: "Startup & GCC Expansion Advisory | Jimmy Manalel",
    description:
      "Founder advisory for investor narrative, venture readiness, commerce infrastructure, and GCC expansion. Who it is for, what is included, and how to enquire.",
    robots: "index, follow",
    h1MustInclude: "GCC expansion advisory",
  },
  {
    path: "/partnerships",
    out: "partnerships/index.html",
    title: "Ecosystem & Strategic Partnerships | Jimmy Manalel",
    description:
      "Partnership enquiries for speaking, founder-community collaboration, ecosystem programmes, and strategic introductions with Jimmy Manalel.",
    robots: "index, follow",
    h1MustInclude: "strategic partnerships",
  },
  {
    path: "/gcc-market-entry",
    out: "gcc-market-entry/index.html",
    title: "GCC Market Entry for Startups | Jimmy Manalel",
    description:
      "Practical overview of GCC and UAE market entry for founders: common challenges, partnerships, distribution, licensing considerations, and mistakes to avoid.",
    robots: "index, follow",
    h1MustInclude: "GCC market entry for startups",
  },
  {
    path: "/investor-narrative",
    out: "investor-narrative/index.html",
    title: "Investor Narrative Architecture | Jimmy Manalel",
    description:
      "What investor narrative architecture means, why narratives fail, and how founders separate storytelling from evidence, metrics, traction, and risk.",
    robots: "index, follow",
    h1MustInclude: "Investor narrative architecture",
  },
  {
    path: "/venture-corridors",
    out: "venture-corridors/index.html",
    title: "Venture Corridor Building | India–GCC | Jimmy Manalel",
    description:
      "What a venture corridor is, how India–GCC founder and capital pathways work, and Jimmy Manalel’s role connecting ecosystems across markets.",
    robots: "index, follow",
    h1MustInclude: "Venture corridor building",
  },
  {
    path: "/commerce-infrastructure",
    out: "commerce-infrastructure/index.html",
    title: "Commerce Infrastructure Review | Jimmy Manalel",
    description:
      "Commerce infrastructure for founders: unit economics, fulfilment, logistics, inventory, margins, and cross-border operational scalability.",
    robots: "index, follow",
    h1MustInclude: "Commerce infrastructure review",
  },
  {
    path: "/privacy",
    out: "privacy/index.html",
    title: "Privacy | Jimmy Manalel",
    description:
      "How jimmymanalel.com handles enquiry and form data for strategy conversations, advisory, partnerships, and tool result emails.",
    robots: "index, follow",
    h1MustInclude: "Privacy",
  },
]

function installDom(url) {
  const dom = new JSDOM("<!doctype html><html><body></body></html>", {
    url,
    pretendToBeVisual: true,
  });

  const { window } = dom;
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
    "HTMLSelectElement",
    "Event",
    "CustomEvent",
  ];

  for (const key of assign) {
    if (key in window) {
      try {
        globalThis[key] = window[key];
      } catch {
        /* ignore */
      }
    }
  }

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

  // Avoid scroll/focus side effects during SSR
  window.scrollTo = () => {};
  if (window.HTMLElement?.prototype?.focus) {
    window.HTMLElement.prototype.focus = () => {};
  }

  return dom;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function applyRouteMeta(templateHtml, route) {
  const canonical =
    route.path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route.path}`;
  let html = templateHtml;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);

  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${escapeHtml(route.robots)}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );

  return { html, canonical };
}

function injectIntoRoot(templateHtml, appHtml) {
  const emptyRoot = /<div id="root"><\/div>/;
  if (!emptyRoot.test(templateHtml)) {
    if (!/<div id="root"[^>]*>/.test(templateHtml)) {
      throw new Error("template is missing #root");
    }
    return templateHtml.replace(
      /<div id="root"[^>]*>[\s\S]*?<\/div>\s*<\/body>/,
      `<div id="root">${appHtml}</div>\n  </body>`
    );
  }
  return templateHtml.replace(emptyRoot, `<div id="root">${appHtml}</div>`);
}

function assertNoBookingDates(appHtml, routePath) {
  const bookingIsoDates = appHtml.match(/\b20\d{2}-\d{2}-\d{2}\b/g) || [];
  const bookingHumanDates =
    appHtml.match(
      /\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\b/g
    ) || [];
  if (bookingIsoDates.length || bookingHumanDates.length) {
    throw new Error(
      `Prerender must not embed live booking dates (${routePath}). Found: ${[
        ...bookingIsoDates,
        ...bookingHumanDates,
      ].join(", ")}`
    );
  }
}

async function main() {
  if (!fs.existsSync(distIndex)) {
    throw new Error("dist/index.html not found. Run vite build first.");
  }

  const before404 = fs.existsSync(dist404) ? fs.readFileSync(dist404, "utf8") : null;
  const shellTemplate = fs.readFileSync(distIndex, "utf8");

  // Ensure empty root for each route shell derived from vite output
  const baseShell = shellTemplate.replace(
    /<div id="root"[^>]*>[\s\S]*?<\/div>/,
    '<div id="root"></div>'
  );

  const vite = await createViteServer({
    root,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });

  try {
    const routerMod = await vite.ssrLoadModule("/src/router.tsx");
    const { createPrerenderRouter } = routerMod;
    if (!createPrerenderRouter) throw new Error("createPrerenderRouter missing from router.tsx");

    const { RouterProvider } = await vite.ssrLoadModule("react-router");

    console.log("Prerender routes:");

    for (const route of ROUTES) {
      const dom = installDom(`${SITE_ORIGIN}${route.path === "/" ? "/" : route.path}`);
      try {
        const router = createPrerenderRouter(route.path);
        let appHtml;
        try {
          appHtml = renderToString(
            React.createElement(RouterProvider, { router })
          );
        } catch (error) {
          console.error(`renderToString failed for ${route.path}`);
          throw error;
        }

        if (!appHtml || appHtml.length < 100) {
          throw new Error(
            `Prerender produced short HTML for ${route.path} (${appHtml?.length || 0} chars)`
          );
        }

        if (!/<h1[\s>]/i.test(appHtml)) {
          throw new Error(`Missing H1 for ${route.path}`);
        }
        if (!appHtml.includes(route.h1MustInclude)) {
          throw new Error(
            `H1 content missing for ${route.path}; expected substring: ${route.h1MustInclude}`
          );
        }

        // HubSpot tracking must not run in prerender (component is client-only; still guard)
        if (/js\.hs-scripts\.com|hs-script-loader/i.test(appHtml)) {
          throw new Error(`HubSpot tracking leaked into prerender for ${route.path}`);
        }

        assertNoBookingDates(appHtml, route.path);

        if (route.path === "/strategy-conversation") {
          if (!appHtml.includes("Loading current availability")) {
            throw new Error(
              'Strategy conversation prerender must show "Loading current availability…"'
            );
          }
        }

        if (appHtml.includes("opacity:0") || appHtml.includes("opacity: 0")) {
          throw new Error(`Prerender opacity:0 content on ${route.path}`);
        }

        const { html: metaShell, canonical } = applyRouteMeta(baseShell, route);
        const next = injectIntoRoot(metaShell, appHtml);

        const titleCount = (next.match(/<title>/gi) || []).length;
        const canonicalCount = (next.match(/rel="canonical"/gi) || []).length;
        if (titleCount !== 1) throw new Error(`${route.path}: expected 1 title, found ${titleCount}`);
        if (canonicalCount !== 1) {
          throw new Error(`${route.path}: expected 1 canonical, found ${canonicalCount}`);
        }
        if (!next.includes(canonical)) {
          throw new Error(`${route.path}: canonical URL missing from output`);
        }
        if (!new RegExp(`content="${route.robots.replace(",", "\\s*,\\s*")}"`, "i").test(next)) {
          throw new Error(`${route.path}: robots directive missing`);
        }

        // No legacy public fragments in crawlable output (except schema @id fragments)
        const badFrags = [
          'href="#workspace-hub"',
          'href="#booking-section"',
          'href="#advisory-enquiry"',
          'href="#partnership-enquiry"',
          "/#workspace-hub",
          "/#booking-section",
          "/#advisory-enquiry",
          "/#partnership-enquiry",
        ];
        for (const frag of badFrags) {
          if (next.includes(frag)) {
            throw new Error(`${route.path}: legacy fragment still present: ${frag}`);
          }
        }

        const outPath = path.join(distDir, route.out);
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, next, "utf8");
        console.log(`  ✓ ${route.path} → ${route.out} (${appHtml.length} chars)`);
      } finally {
        dom.window.close();
      }
    }

    if (before404 !== null) {
      const after404 = fs.readFileSync(dist404, "utf8");
      if (after404 !== before404) {
        throw new Error("prerender unexpectedly modified dist/404.html");
      }
      if (!/noindex,\s*follow/i.test(after404)) {
        throw new Error("dist/404.html missing noindex, follow");
      }
      if (/rel="canonical"/i.test(after404)) {
        throw new Error("dist/404.html must not have a canonical tag");
      }
    }

    console.log("Prerender complete:");
    console.log(`  routes: ${ROUTES.length}`);
    console.log(`  404.html preserved: ${before404 !== null ? "yes" : "n/a"}`);
    console.log("  booking dates suppressed: yes");
    console.log("  hubspot tracking in prerender: no");
  } finally {
    await vite.close();
  }
}

main().catch((error) => {
  console.error("Prerender failed:", error);
  process.exit(1);
});
