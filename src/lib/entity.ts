/**
 * Single source of truth for public entity facts used in copy, metadata, and JSON-LD.
 * Owner-confirmed claims only for biographical numbers and community programmes.
 */

import { SITE_ORIGIN } from "./siteRoutes";

export const PERSON_ID = `${SITE_ORIGIN}/#person`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const PROFILE_ID = `${SITE_ORIGIN}/#profile`;
export const ONETREPRENEUR_ORG_ID = `${SITE_ORIGIN}/#1trepreneur`;

export const PERSON_NAME = "Jimmy Manalel";

/** Short factual intro (vary slightly in page copy; do not paste identically everywhere). */
export const PERSON_JOB_TITLE =
  "Venture Corridor Builder and Cross-Border Startup Strategist";

export const PERSON_DESCRIPTION_SHORT =
  "Jimmy Manalel is a venture corridor builder and cross-border startup strategist working with founders, startup ecosystems, and market-entry networks across India, the GCC, and the Middle East.";

export const PERSON_DESCRIPTION_MEDIUM =
  "Jimmy Manalel is a venture corridor builder and cross-border startup strategist. He co-founded Plantshop.ae, a UAE online plants and gardening brand that later entered the 500 Global accelerator programme, co-founded and helped run 1trepreneur—a Dubai founder community through which he has mentored more than 800 founders—and helps founders with investor narrative, commerce infrastructure, and cross-border expansion between India, the GCC, and related markets.";

/** Visible credibility metric (founders mentored, not clients or investments). */
export const FOUNDERS_MENTORED_METRIC = "800+ Founders Mentored";
export const FOUNDERS_MENTORED_LABEL =
  "Through 1trepreneur founder community programmes, meetups, mentoring sessions and ecosystem initiatives in Dubai.";

export const KNOWS_ABOUT = [
  "Venture corridors",
  "Cross-border startup strategy",
  "Investor narrative architecture",
  "GCC market entry",
  "Commerce infrastructure",
  "Founder strategic advisory",
  "E-commerce logistics",
  "Startup venture readiness",
  "India–Middle East founder networks",
  "Founder mentorship",
  "Startup ecosystem development",
  "Founder communities",
] as const;

export const SAME_AS = ["https://www.linkedin.com/in/planterjimmy"] as const;

/** Contact for visible mailto links only — not embedded in Person JSON-LD. */
export const CONTACT_EMAIL = "jimmymanalel@gmail.com";

/** Ventures and community roles — keep wording precise. */
export const VENTURES = [
  {
    name: "Plantshop.ae",
    role: "Co-founder",
    note: "UAE online plants and gardening brand; later entered the 500 Global accelerator programme (as described on this site).",
  },
  {
    name: "1trepreneur",
    role: "Co-founder; founder community operator",
    note: "Dubai-based founder community focused on peer mentorship, founder meetups, and practical startup ecosystem initiatives. Through the community and its programmes, Jimmy has mentored more than 800 founders. Not an investment fund or accelerator brand claim.",
  },
  {
    name: "1Tank",
    role: "Co-created; helped conduct",
    note: "Startup pitch competition held at Expand North Star in Dubai, connecting selected founders with investors and ecosystem leaders. Mentorship counts are separate from pitch applicants.",
  },
] as const;

export const MARKETS = ["GCC", "UAE", "India", "Middle East", "Dubai"] as const;

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME,
    url: `${SITE_ORIGIN}/`,
    jobTitle: PERSON_JOB_TITLE,
    description: PERSON_DESCRIPTION_MEDIUM,
    knowsAbout: [...KNOWS_ABOUT],
    sameAs: [...SAME_AS],
    founder: { "@id": ONETREPRENEUR_ORG_ID },
  };
}

/** Minimal Organization node for 1trepreneur — no fabricated addresses, funding, or ratings. */
export function onetrepreneurOrgJsonLd() {
  return {
    "@type": "Organization",
    "@id": ONETREPRENEUR_ORG_ID,
    name: "1trepreneur",
    description:
      "Dubai-based founder community built around peer mentoring, founder meetups, and practical startup support. Associated with ecosystem initiatives including 1Tank at Expand North Star.",
    founder: { "@id": PERSON_ID },
    areaServed: {
      "@type": "City",
      name: "Dubai",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_ORIGIN}/`,
    name: PERSON_NAME,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function webPageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  idSuffix?: string;
}) {
  const url =
    opts.path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${opts.path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item:
        item.path === "/"
          ? `${SITE_ORIGIN}/`
          : `${SITE_ORIGIN}${item.path}`,
    })),
  };
}

export function faqPageJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    provider: { "@id": PERSON_ID },
    url:
      opts.path === "/"
        ? `${SITE_ORIGIN}/`
        : `${SITE_ORIGIN}${opts.path}`,
    areaServed: MARKETS.filter((m) => m !== "Dubai").map((m) => ({
      "@type": "Place",
      name: m,
    })),
  };
}
