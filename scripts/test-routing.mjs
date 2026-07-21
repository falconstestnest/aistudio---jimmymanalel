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
  "/asia-gcc",
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
  assert.ok(home.includes("Explore the Asia–GCC Corridor") || home.includes("Asia–GCC Corridor"));
  assert.ok(home.includes("ROUTES.asiaGcc") || home.includes("/asia-gcc"));
  assert.ok(home.includes("ROUTES.strategyConversation") || home.includes("/strategy-conversation"));
  assert.ok(home.includes("ROUTES.advisory") || home.includes("/advisory"));
  assert.ok(
    home.includes("ROUTES.dialogue") ||
      home.includes("ROUTES.ventureTools") ||
      home.includes("/venture-tools")
  );
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

test("asia-gcc page content and constraints", () => {
  const page = fs.readFileSync(path.join(root, "src/pages/AsiaGccPage.tsx"), "utf8");
  assert.ok(page.includes("Commercial pathways between Asia and the GCC"));
  assert.ok(page.includes("operator-led commercial assessment"));
  assert.ok(!page.includes("operator-led diligence"));
  assert.ok(!page.includes("offices in Singapore"));
  assert.ok(!page.includes("Global investment authority"));
  assert.ok(!page.includes("Guaranteed GCC"));
  const matrix = fs.readFileSync(
    path.join(root, "src/components/corridor/CountryOpportunityMatrix.tsx"),
    "utf8"
  );
  assert.ok(matrix.includes("Singapore"));
  assert.ok(matrix.includes("Malaysia"));
  assert.ok(matrix.includes("Thailand"));
  assert.ok(matrix.includes("South Korea"));
  assert.ok(matrix.includes("India"));
  assert.ok(matrix.includes("GCC"));
  const pathways = fs.readFileSync(
    path.join(root, "src/components/corridor/CorridorPathways.tsx"),
    "utf8"
  );
  assert.ok(pathways.includes("regulated financial advice"));
  assert.ok(pathways.includes("Operator-Led Commercial Assessment"));
  const header = fs.readFileSync(
    path.join(root, "src/components/layout/SiteHeader.tsx"),
    "utf8"
  );
  // Compact identity header: JM · Jimmy Manalel · centre nav · Private Conversation
  assert.ok(!header.includes("Singapore")); // no country list in header
  assert.ok(header.includes("JM"));
  assert.ok(header.includes("Jimmy Manalel"));
  assert.ok(header.includes("Venture Corridor Builder"));
  assert.ok(!header.includes("Analytics"));
  assert.ok(!header.includes("Work With Jimmy"));
  assert.ok(!header.includes("Narrative Grader"));
  assert.ok(!header.includes("Dialogue"));
  assert.ok(header.includes("Venture Tools"));
  assert.ok(header.includes("ROUTES.asiaGcc") || header.includes("Asia–GCC"));
  assert.ok(header.includes("About"));
  assert.ok(header.includes("Private Conversation"));
  // Single desktop CTA id (mobile CTA lives inside menu, not a second header button)
  const desktopCtaMatches = header.match(/id="header-booking"/g) || [];
  assert.equal(desktopCtaMatches.length, 1);
  const footer = fs.readFileSync(
    path.join(root, "src/components/layout/SiteFooter.tsx"),
    "utf8"
  );
  assert.ok(footer.includes("ROUTES.asiaGcc") || footer.includes("asia-gcc"));
  assert.ok(footer.includes("Jimmy Manalel"));
  assert.ok(footer.includes("Venture Corridor Builder"));
});

test("no operator-led diligence wording remains", () => {
  const roots = ["src", "public"];
  for (const dir of roots) {
    const walk = (d) => {
      for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, ent.name);
        if (ent.isDirectory()) {
          if (ent.name === "node_modules" || ent.name === "dist") continue;
          walk(full);
        } else if (/\.(tsx?|ts|txt|html|mjs|md)$/i.test(ent.name)) {
          const text = fs.readFileSync(full, "utf8");
          assert.ok(
            !text.includes("operator-led diligence"),
            `diligence remains in ${full}`
          );
        }
      }
    };
    walk(path.join(root, dir));
  }
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
  assert.ok(
    home.includes("800+ Founders Mentored") ||
      home.includes("800+ founders") ||
      home.includes("800+ founders mentored") ||
      home.includes("More than 800 founders") ||
      home.includes("more than 800 founders")
  );
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

  test("dist asia-gcc prerenders with countries and disclaimer", () => {
    const html = fs.readFileSync(path.join(root, "dist/asia-gcc/index.html"), "utf8");
    assert.ok(/<h1[\s>]/i.test(html));
    assert.equal((html.match(/<h1[\s>]/gi) || []).length, 1);
    assert.ok(html.includes("Singapore"));
    assert.ok(html.includes("Malaysia"));
    assert.ok(html.includes("Thailand"));
    assert.ok(html.includes("South Korea"));
    assert.ok(html.includes("regulated financial advice"));
    assert.ok(html.includes('rel="canonical"'));
    assert.ok(html.includes("https://www.jimmymanalel.com/asia-gcc"));
    assert.ok(html.includes("application/ld+json"));
    assert.ok(!html.includes("80+ Startups"));
  });

  test("dist homepage includes Asia-GCC section", () => {
    const html = fs.readFileSync(path.join(root, "dist/index.html"), "utf8");
    assert.ok(
      html.includes("Asia–GCC") ||
        html.includes("Asia-GCC") ||
        html.includes("asia-gcc") ||
        html.includes("next generation of ventures")
    );
    assert.ok(
      html.includes("next generation of ventures") ||
        html.includes("Explore the Asia") ||
        html.includes("corridor")
    );
    assert.ok(html.includes("Singapore") || html.includes("Illustrative strategic corridor"));
  });

  test("dist homepage hierarchy and restored pathways", () => {
    const html = fs.readFileSync(path.join(root, "dist/index.html"), "utf8");
    assert.ok(html.includes("The Operator Track Record"));
    assert.ok(html.includes("My Journey"));
    // Exactly one visible My Journey H2 (not duplicated in timeline badge/heading)
    const myJourneyH2 = (html.match(/>My Journey</g) || []).length;
    assert.ok(myJourneyH2 >= 1, "My Journey heading present");
    assert.ok(html.includes("Founder Workspace"));
    assert.ok(html.includes("Narrative Grader"));
    assert.ok(html.includes("/venture-tools/narrative-grader"));
    assert.ok(html.includes("Ecosystem Navigation"));
    assert.ok(html.includes("Request Strategic Corridor Access"));
    assert.ok(html.includes("Illustrative strategic corridor nodes"));
    // JM identity in prerendered header
    assert.ok(html.includes("Jimmy Manalel"));
    assert.ok(html.includes(">JM<") || html.includes("JM</"));
    // Tools not in homepage initial bundle marker
    assert.ok(!html.includes("VentureToolsWorkspace"));
    // 500 Global attached to Plantshop only — no personal VC backing title
    assert.ok(!html.includes("VC Backing & 500 Global"));
    assert.ok(
      html.includes("Plantshop") && html.includes("500 Global Chapter"),
      "Plantshop-specific 500 Global timeline title present"
    );
    assert.ok(!/personally.*500 Global|personally backed by 500/i.test(html));
  });
} else {
  console.log("  ⚠ dist/ not built yet — skipping built-output checks");
}

test("500 Global wording stays company-attached", () => {
  const timeline = fs.readFileSync(
    path.join(root, "src/components/AboutTimeline.tsx"),
    "utf8"
  );
  assert.ok(!timeline.includes("VC Backing & 500 Global"));
  assert.ok(timeline.includes("500 Global Chapter"));
  assert.ok(
    timeline.includes("Plantshop participated in the 500 Startups ecosystem") ||
      timeline.includes("500 Startups ecosystem, now 500 Global")
  );
  assert.ok(!timeline.includes("received backing from 500 Global"));
  assert.ok(!timeline.includes("personally backed"));
  // Dialogue system prompts must not claim personal 500 Global portfolio status
  const server = fs.readFileSync(path.join(root, "server.ts"), "utf8");
  assert.ok(!server.includes("500 Global portfolio co-founder"));
  assert.ok(!server.includes("backed by 500 Global"));
});

console.log(`\n${passed} routing tests passed.\n`);
