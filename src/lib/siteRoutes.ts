/**
 * Canonical public routes for jimmymanalel.com
 * Keep this as the single source of truth for pathnames, metadata, and legacy hashes.
 */

export const SITE_ORIGIN = "https://www.jimmymanalel.com";

export type ToolKey = "dialogue" | "narrative-grader" | "commerce-infrastructure-audit";

export const ROUTES = {
  home: "/",
  about: "/about",
  ventureTools: "/venture-tools",
  dialogue: "/venture-tools/dialogue",
  narrativeGrader: "/venture-tools/narrative-grader",
  commerceAudit: "/venture-tools/commerce-infrastructure-audit",
  strategyConversation: "/strategy-conversation",
  advisory: "/advisory",
  partnerships: "/partnerships",
  gccMarketEntry: "/gcc-market-entry",
  investorNarrative: "/investor-narrative",
  ventureCorridors: "/venture-corridors",
  commerceInfrastructure: "/commerce-infrastructure",
  privacy: "/privacy",
} as const;

export type AppPath = (typeof ROUTES)[keyof typeof ROUTES];

/** Explicit approved SPA paths (no catch-all). */
export const APPROVED_PATHS: readonly string[] = [
  ROUTES.home,
  ROUTES.about,
  ROUTES.ventureTools,
  ROUTES.dialogue,
  ROUTES.narrativeGrader,
  ROUTES.commerceAudit,
  ROUTES.strategyConversation,
  ROUTES.advisory,
  ROUTES.partnerships,
  ROUTES.gccMarketEntry,
  ROUTES.investorNarrative,
  ROUTES.ventureCorridors,
  ROUTES.commerceInfrastructure,
  ROUTES.privacy,
];

export function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  const stripped = pathname.replace(/\/+$/, "");
  return stripped === "" ? "/" : stripped;
}

export function isApprovedPath(pathname: string): boolean {
  return APPROVED_PATHS.includes(normalizePathname(pathname));
}

export function toolKeyFromPath(pathname: string): ToolKey {
  const path = normalizePathname(pathname);
  if (path === ROUTES.narrativeGrader) return "narrative-grader";
  if (path === ROUTES.commerceAudit) return "commerce-infrastructure-audit";
  return "dialogue";
}

export function pathForTool(tool: ToolKey): string {
  switch (tool) {
    case "narrative-grader":
      return ROUTES.narrativeGrader;
    case "commerce-infrastructure-audit":
      return ROUTES.commerceAudit;
    default:
      return ROUTES.dialogue;
  }
}

/** Legacy homepage fragment → clean pathname (client-side only). */
export const LEGACY_HASH_REDIRECTS: Record<string, string> = {
  "workspace-hub": ROUTES.ventureTools,
  "venture-tools": ROUTES.ventureTools,
  "venture-dialogue": ROUTES.dialogue,
  "narrative-grader": ROUTES.narrativeGrader,
  "commerce-infrastructure-audit": ROUTES.commerceAudit,
  "booking-section": ROUTES.strategyConversation,
  "strategy-conversation": ROUTES.strategyConversation,
  "advisory-enquiry": ROUTES.advisory,
  "partnership-enquiry": ROUTES.partnerships,
  "journey-header": ROUTES.about,
};

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  /** indexable routes appear in sitemap */
  robots: "index, follow" | "noindex, follow";
  h1: string;
};

export const ROUTE_SEO: Record<string, RouteSeo> = {
  [ROUTES.home]: {
    path: ROUTES.home,
    title: "Jimmy Manalel | Venture Corridor Builder & Cross-Border Startup Strategist",
    description:
      "Jimmy Manalel is a venture corridor builder and cross-border startup strategist helping founders with investor narratives, GCC market entry, commerce infrastructure, and India–Middle East venture corridors.",
    robots: "index, follow",
    h1: "Venture corridor builder connecting founders, ecosystems, and market expansion pathways.",
  },
  [ROUTES.about]: {
    path: ROUTES.about,
    title: "About Jimmy Manalel | Founder Journey & Cross-Border Work",
    description:
      "About Jimmy Manalel: banking roots, co-founding Plantshop.ae, 500 Global accelerator experience, and work building India–GCC venture corridors for founders.",
    robots: "index, follow",
    h1: "About Jimmy Manalel",
  },
  [ROUTES.ventureTools]: {
    path: ROUTES.ventureTools,
    title: "Founder Strategy Tools | Jimmy Manalel",
    description:
      "Free founder strategy tools from Jimmy Manalel: corridor dialogue, startup narrative grading, and commerce infrastructure analytics.",
    robots: "index, follow",
    h1: "Founder strategy tools",
  },
  [ROUTES.dialogue]: {
    path: ROUTES.dialogue,
    title: "Founder Strategy Dialogue | Jimmy Manalel",
    description:
      "Corridor Dialogue — a founder strategy conversation tool to pressure-test positioning, expansion logic, and venture narrative clarity.",
    robots: "index, follow",
    h1: "Corridor Dialogue",
  },
  [ROUTES.narrativeGrader]: {
    path: ROUTES.narrativeGrader,
    title: "Startup Narrative Grader | Jimmy Manalel",
    description:
      "Score and strengthen your investor narrative with Jimmy Manalel’s startup narrative grader — clarity, fundability, and corridor positioning.",
    robots: "index, follow",
    h1: "Narrative Grader",
  },
  [ROUTES.commerceAudit]: {
    path: ROUTES.commerceAudit,
    title: "Commerce Infrastructure Audit Tool | Jimmy Manalel",
    description:
      "Interactive store economics diagnostics: logistics ratio, LTV/CAC, and projected contribution using unit-economics thinking from e-commerce operations.",
    robots: "index, follow",
    h1: "Commerce Infrastructure Audit",
  },
  [ROUTES.strategyConversation]: {
    path: ROUTES.strategyConversation,
    title: "Request a Strategy Conversation | Jimmy Manalel",
    description:
      "Request a strategy conversation with Jimmy Manalel about founder strategy, investor narrative, GCC expansion, or commerce infrastructure. This is a request, not an automatic booking.",
    robots: "index, follow",
    h1: "Request a strategy conversation",
  },
  [ROUTES.advisory]: {
    path: ROUTES.advisory,
    title: "Startup & GCC Expansion Advisory | Jimmy Manalel",
    description:
      "Founder advisory for investor narrative, venture readiness, commerce infrastructure, and GCC expansion. Who it is for, what is included, and how to enquire.",
    robots: "index, follow",
    h1: "Startup & GCC expansion advisory",
  },
  [ROUTES.partnerships]: {
    path: ROUTES.partnerships,
    title: "Ecosystem & Strategic Partnerships | Jimmy Manalel",
    description:
      "Partnership enquiries for speaking, founder-community collaboration, ecosystem programmes, and strategic introductions with Jimmy Manalel.",
    robots: "index, follow",
    h1: "Ecosystem & strategic partnerships",
  },
  [ROUTES.gccMarketEntry]: {
    path: ROUTES.gccMarketEntry,
    title: "GCC Market Entry for Startups | Jimmy Manalel",
    description:
      "Practical overview of GCC and UAE market entry for founders: common challenges, partnerships, distribution, licensing considerations, and mistakes to avoid.",
    robots: "index, follow",
    h1: "GCC market entry for startups",
  },
  [ROUTES.investorNarrative]: {
    path: ROUTES.investorNarrative,
    title: "Investor Narrative Architecture | Jimmy Manalel",
    description:
      "What investor narrative architecture means, why narratives fail, and how founders separate storytelling from evidence, metrics, traction, and risk.",
    robots: "index, follow",
    h1: "Investor narrative architecture",
  },
  [ROUTES.ventureCorridors]: {
    path: ROUTES.ventureCorridors,
    title: "Venture Corridor Building | India–GCC | Jimmy Manalel",
    description:
      "What a venture corridor is, how India–GCC founder and capital pathways work, and Jimmy Manalel’s role connecting ecosystems across markets.",
    robots: "index, follow",
    h1: "Venture corridor building",
  },
  [ROUTES.commerceInfrastructure]: {
    path: ROUTES.commerceInfrastructure,
    title: "Commerce Infrastructure Review | Jimmy Manalel",
    description:
      "Commerce infrastructure for founders: unit economics, fulfilment, logistics, inventory, margins, and cross-border operational scalability.",
    robots: "index, follow",
    h1: "Commerce infrastructure review",
  },
  [ROUTES.privacy]: {
    path: ROUTES.privacy,
    title: "Privacy | Jimmy Manalel",
    description:
      "How jimmymanalel.com handles enquiry and form data for strategy conversations, advisory, partnerships, and tool result emails.",
    robots: "index, follow",
    h1: "Privacy",
  },
};

export function seoForPath(pathname: string): RouteSeo {
  const path = normalizePathname(pathname);
  return (
    ROUTE_SEO[path] || {
      path,
      title: "Page Not Found | Jimmy Manalel",
      description: "The page you requested is not available on Jimmy Manalel’s site.",
      robots: "noindex, follow",
      h1: "This path hasn’t been built yet.",
    }
  );
}

/** Sitemap includes only indexable approved routes. */
export function sitemapPaths(): string[] {
  return APPROVED_PATHS.filter((p) => ROUTE_SEO[p]?.robots === "index, follow");
}

export function absoluteUrl(pathname: string): string {
  const path = normalizePathname(pathname);
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

/** Prerender manifest: path → dist output file. */
export function prerenderManifest(): Array<{
  path: string;
  out: string;
  title: string;
  description: string;
  robots: string;
  h1MustInclude: string;
}> {
  return APPROVED_PATHS.map((path) => {
    const seo = ROUTE_SEO[path];
    const out =
      path === "/"
        ? "index.html"
        : `${path.replace(/^\//, "")}/index.html`;
    // Short substring used by prerender assert (avoid HTML entity issues with &)
    const h1MustInclude =
      path === ROUTES.home
        ? "Venture corridor builder connecting"
        : path === ROUTES.advisory
          ? "GCC expansion advisory"
          : path === ROUTES.partnerships
            ? "strategic partnerships"
            : seo.h1.slice(0, 28);
    return {
      path,
      out,
      title: seo.title,
      description: seo.description,
      robots: seo.robots,
      h1MustInclude,
    };
  });
}
