#!/usr/bin/env node
/**
 * Routing / SEO / fragment-migration tests (source + built dist).
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    console.error(`  ✗ ${name}`);
    throw e;
  }
}

const APPROVED = [
  "/",
  "/about",
  "/venture-tools",
  "/venture-tools/dialogue",
  "/venture-tools/narrative-grader",
  "/venture-tools/commerce-infrastructure-audit",
  "/strategy-conversation",
  "/advisory",
  "/partnerships",
  "/gcc-market-entry",
  "/investor-narrative",
  "/venture-corridors",
  "/commerce-infrastructure",
  "/privacy",
];

const LEGACY = {
  "workspace-hub": "/venture-tools",
  "venture-tools": "/venture-tools",
  "venture-dialogue": "/venture-tools/dialogue",
  "narrative-grader": "/venture-tools/narrative-grader",
  "commerce-infrastructure-audit": "/venture-tools/commerce-infrastructure-audit",
  "booking-section": "/strategy-conversation",
  "strategy-conversation": "/strategy-conversation",
  "advisory-enquiry": "/advisory",
  "partnership-enquiry": "/partnerships",
};

console.log("\nRouting & metadata tests\n------------------------");

test("siteRoutes defines all approved paths", () => {
  const src = fs.readFileSync(path.join(root, "src/lib/siteRoutes.ts"), "utf8");
  for (const p of APPROVED) {
    assert.ok(src.includes(`"${p}"`) || src.includes(`'${p}'`), `missing ${p}`);
  }
});

test("legacy hash map is complete", () => {
  const src = fs.readFileSync(path.join(root, "src/lib/siteRoutes.ts"), "utf8");
  for (const [hash, dest] of Object.entries(LEGACY)) {
    assert.ok(src.includes(`"${hash}"`), `missing hash ${hash}`);
    assert.ok(src.includes(dest), `missing dest ${dest}`);
  }
});

test("router uses createBrowserRouter route tree", () => {
  const src = fs.readFileSync(path.join(root, "src/router.tsx"), "utf8");
  assert.ok(src.includes("createBrowserRouter"));
  assert.ok(src.includes("createMemoryRouter"));
  assert.ok(src.includes("HomePage"));
  assert.ok(src.includes("VentureToolsPage"));
  assert.ok(src.includes("StrategyConversationPage"));
  assert.ok(src.includes("AdvisoryPage"));
  assert.ok(src.includes("PartnershipsPage"));
  // defensive * only — not production HTTP 404
  assert.ok(src.includes('path: "*"'));
});

test("no wildcard SPA rewrite in vercel.json", () => {
  const raw = fs.readFileSync(path.join(root, "vercel.json"), "utf8");
  const json = JSON.parse(raw);
  assert.equal(json.trailingSlash, false);
  assert.ok(Array.isArray(json.rewrites));
  for (const r of json.rewrites) {
    assert.notEqual(r.source, "/(.*)");
    assert.ok(!String(r.source).includes("(.*)"), `catch-all source: ${r.source}`);
    assert.ok(!String(r.source).includes(":path*"), `path splat: ${r.source}`);
  }
  const sources = json.rewrites.map((r) => r.source);
  for (const p of APPROVED.filter((x) => x !== "/")) {
    assert.ok(sources.includes(p), `missing rewrite for ${p}`);
  }
});

test("public CTAs no longer use major legacy fragments", () => {
  const files = [
    "src/pages/HomePage.tsx",
    "src/components/layout/SiteHeader.tsx",
    "src/components/layout/SiteFooter.tsx",
    "src/components/NotFoundPage.tsx",
    "public/404.html",
  ];
  const forbidden = [
    "#workspace-hub",
    "#booking-section",
    "#advisory-enquiry",
    "#partnership-enquiry",
  ];
  for (const file of files) {
    const text = fs.readFileSync(path.join(root, file), "utf8");
    for (const frag of forbidden) {
      assert.ok(!text.includes(frag), `${file} still contains ${frag}`);
    }
  }
});

test("homepage CTAs use approved pathnames", () => {
  const home = fs.readFileSync(path.join(root, "src/pages/HomePage.tsx"), "utf8");
  assert.ok(home.includes("Explore Founder Tools"));
  assert.ok(home.includes("ROUTES.ventureTools") || home.includes("/venture-tools"));
  assert.ok(home.includes("ROUTES.commerceAudit") || home.includes("commerce-infrastructure-audit"));
  assert.ok(home.includes("ROUTES.strategyConversation") || home.includes("/strategy-conversation"));
  assert.ok(home.includes("ROUTES.advisory") || home.includes("/advisory"));
  assert.ok(home.includes("ROUTES.partnerships") || home.includes("/partnerships"));
});

test("tool workspace uses NavLink pathnames not button tabs", () => {
  const src = fs.readFileSync(
    path.join(root, "src/components/tools/VentureToolsWorkspace.tsx"),
    "utf8"
  );
  assert.ok(src.includes("NavLink"));
  assert.ok(src.includes("ROUTES.dialogue"));
  assert.ok(src.includes("ROUTES.narrativeGrader"));
  assert.ok(src.includes("ROUTES.commerceAudit"));
  assert.ok(src.includes('aria-current'));
});

test("sitemap includes only approved indexable paths, no fragments", () => {
  const sm = fs.readFileSync(path.join(root, "public/sitemap.xml"), "utf8");
  assert.ok(!sm.includes("#"));
  for (const p of APPROVED) {
    const loc =
      p === "/"
        ? "https://www.jimmymanalel.com/"
        : `https://www.jimmymanalel.com${p}`;
    assert.ok(sm.includes(`<loc>${loc}</loc>`), `sitemap missing ${loc}`);
  }
  assert.ok(!sm.includes("/api/"));
  assert.ok(!sm.includes("404"));
});

test("llms.txt exists with entity and key pages", () => {
  const t = fs.readFileSync(path.join(root, "public/llms.txt"), "utf8");
  assert.ok(t.includes("Jimmy Manalel"));
  assert.ok(t.includes("https://www.jimmymanalel.com/about"));
  assert.ok(t.includes("Plantshop.ae"));
  assert.ok(t.includes("linkedin.com/in/planterjimmy"));
  assert.ok(!t.toLowerCase().includes("guaranteed ranking"));
});

test("entity module avoids inventing unlisted ventures", () => {
  const src = fs.readFileSync(path.join(root, "src/lib/entity.ts"), "utf8");
  assert.ok(src.includes("Plantshop.ae"));
  assert.ok(src.includes("1trepreneur"));
  assert.ok(src.includes("1Tank"));
  assert.ok(src.includes("800+ Founders Mentored") || src.includes("more than 800 founders"));
  // Person JSON-LD must not embed email
  assert.ok(src.includes("export function personJsonLd"));
  assert.ok(!/personJsonLd[\s\S]*?email:\s*CONTACT_EMAIL/.test(src));
  // Not asserted as fact on site without verification:
  assert.ok(!src.includes("FindNursery"));
  assert.ok(!src.includes("Founder Being"));
  assert.ok(!src.includes("Plantshop.me"));
});

test("no obsolete 80+ Startups claim in public source", () => {
  const files = [
    "src/pages/HomePage.tsx",
    "src/pages/AboutPage.tsx",
    "src/lib/entity.ts",
    "public/llms.txt",
  ];
  for (const rel of files) {
    const text = fs.readFileSync(path.join(root, rel), "utf8");
    assert.ok(!text.includes("80+ Startups"), `${rel} still has 80+ Startups`);
    assert.ok(!/\b80\+ Startups\b/i.test(text), rel);
  }
  const home = fs.readFileSync(path.join(root, "src/pages/HomePage.tsx"), "utf8");
  assert.ok(home.includes("800+ Founders Mentored"));
});

test("unique titles/descriptions per route in siteRoutes", () => {
  const src = fs.readFileSync(path.join(root, "src/lib/siteRoutes.ts"), "utf8");
  // crude uniqueness: count title strings
  const titles = [...src.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);
  const unique = new Set(titles);
  assert.equal(unique.size, titles.length, `duplicate titles: ${titles}`);
});

// Built dist checks (when available)
const distIndex = path.join(root, "dist", "index.html");
if (fs.existsSync(distIndex)) {
  test("dist has prerendered route shells", () => {
    for (const p of APPROVED) {
      const rel =
        p === "/"
          ? "index.html"
          : `${p.replace(/^\//, "")}/index.html`;
      const full = path.join(root, "dist", rel);
      assert.ok(fs.existsSync(full), `missing ${rel}`);
      const html = fs.readFileSync(full, "utf8");
      assert.ok(/<h1[\s>]/i.test(html), `${rel} missing h1`);
      assert.ok(/rel="canonical"/i.test(html), `${rel} missing canonical`);
      assert.equal((html.match(/<title>/gi) || []).length, 1);
    }
  });

  test("dist route canonicals are unique and correct", () => {
    const canons = new Set();
    for (const p of APPROVED) {
      const rel =
        p === "/"
          ? "index.html"
          : `${p.replace(/^\//, "")}/index.html`;
      const html = fs.readFileSync(path.join(root, "dist", rel), "utf8");
      const m = html.match(/rel="canonical"\s+href="([^"]+)"/i);
      assert.ok(m, `no canonical in ${rel}`);
      const expected =
        p === "/"
          ? "https://www.jimmymanalel.com/"
          : `https://www.jimmymanalel.com${p}`;
      assert.equal(m[1], expected);
      assert.ok(!canons.has(m[1]), `duplicate canonical ${m[1]}`);
      canons.add(m[1]);
    }
  });

  test("dist strategy-conversation suppresses live booking dates", () => {
    const html = fs.readFileSync(
      path.join(root, "dist/strategy-conversation/index.html"),
      "utf8"
    );
    assert.ok(html.includes("Loading current availability"));
    assert.equal((html.match(/\b20\d{2}-\d{2}-\d{2}\b/g) || []).length, 0);
  });

  test("dist 404 preserved noindex, no homepage canonical", () => {
    const html = fs.readFileSync(path.join(root, "dist/404.html"), "utf8");
    assert.ok(/noindex,\s*follow/i.test(html));
    assert.ok(!/rel="canonical"/i.test(html));
  });

  test("dist tool route selects expected content markers", () => {
    const dialogue = fs.readFileSync(
      path.join(root, "dist/venture-tools/dialogue/index.html"),
      "utf8"
    );
    assert.ok(dialogue.includes("Corridor Dialogue"));
    const grader = fs.readFileSync(
      path.join(root, "dist/venture-tools/narrative-grader/index.html"),
      "utf8"
    );
    assert.ok(grader.includes("Narrative Grader"));
    const audit = fs.readFileSync(
      path.join(root, "dist/venture-tools/commerce-infrastructure-audit/index.html"),
      "utf8"
    );
    assert.ok(audit.includes("Commerce Infrastructure Audit"));
  });
} else {
  console.log("  ⚠ dist/ not built yet — skipping built-output checks");
}

console.log(`\n${passed} routing tests passed.\n`);
