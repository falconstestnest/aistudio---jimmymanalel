/**
 * Canonical public routes for jimmymanalel.com
 * Keep this as the single source of truth for pathnames, metadata, and legacy hashes.
 */

export const SITE_ORIGIN = "https://www.jimmymanalel.com";

export type ToolKey = "dialogue" | "narrative-grader" | "commerce-infrastructure-audit";

export const ROUTES = {
  home: "/",
  ventureTools: "/venture-tools",
  dialogue: "/venture-tools/dialogue",
  narrativeGrader: "/venture-tools/narrative-grader",
  commerceAudit: "/venture-tools/commerce-infrastructure-audit",
  strategyConversation: "/strategy-conversation",
  advisory: "/advisory",
  partnerships: "/partnerships",
} as const;

export type AppPath = (typeof ROUTES)[keyof typeof ROUTES];

/** Explicit approved SPA paths (no catch-all). */
export const APPROVED_PATHS: readonly string[] = [
  ROUTES.home,
  ROUTES.ventureTools,
  ROUTES.dialogue,
  ROUTES.narrativeGrader,
  ROUTES.commerceAudit,
  ROUTES.strategyConversation,
  ROUTES.advisory,
  ROUTES.partnerships,
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
      "Jimmy Manalel is a venture corridor builder and cross-border startup strategist helping founders shape investor narratives, enter GCC markets, build strategic partnerships, and create scalable commerce infrastructure.",
    robots: "index, follow",
    h1: "Venture corridor builder connecting founders, ecosystems, and market expansion pathways.",
  },
  [ROUTES.ventureTools]: {
    path: ROUTES.ventureTools,
    title: "Founder Strategy Tools | Jimmy Manalel",
    description:
      "Free founder strategy tools from Jimmy Manalel: corridor dialogue, startup narrative grading, and commerce infrastructure analytics for cross-border operators.",
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
    title: "Commerce Infrastructure Audit | Jimmy Manalel",
    description:
      "Audit commerce infrastructure economics: logistics density, multi-node warehousing, SLA risk, and margin preservation for cross-border brands.",
    robots: "index, follow",
    h1: "Commerce Infrastructure Audit",
  },
  [ROUTES.strategyConversation]: {
    path: ROUTES.strategyConversation,
    title: "Request a Strategy Conversation | Jimmy Manalel",
    description:
      "Request a strategy conversation with Jimmy Manalel. Share preferred timing for founder advisory, investor narrative, or GCC expansion discussions.",
    robots: "index, follow",
    h1: "Request a strategy conversation",
  },
  [ROUTES.advisory]: {
    path: ROUTES.advisory,
    title: "Startup & GCC Expansion Advisory | Jimmy Manalel",
    description:
      "Advisory enquiry for founder strategy, investor narrative architecture, venture readiness, commerce infrastructure, and GCC expansion pathways.",
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
