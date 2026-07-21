import React from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "../../lib/siteRoutes";

const pathways = [
  {
    /** DOM id for /asia-gcc#audit (footer + pathway deep links) */
    id: "audit",
    to: `${ROUTES.asiaGcc}#audit`,
    accent: "border-l-amber-500/70",
    heading: "Enter new markets without carrying old assumptions.",
    offering: "GCC Market-Entry Readiness",
    focus: [
      "Market relevance",
      "Pricing",
      "Distribution",
      "Partnerships",
      "Unit economics",
      "Founder narrative",
      "Operating readiness",
    ],
    cta: "Assess GCC Readiness",
    disclaimer: null as string | null,
  },
  {
    id: "investors",
    to: `${ROUTES.asiaGcc}#investors`,
    accent: "border-l-sky-500/50",
    heading: "See what the pitch does not reveal.",
    offering: "Operator-Led Commercial Assessment",
    focus: [
      "Founder judgement",
      "Operating discipline",
      "Business-model clarity",
      "Cross-border assumptions",
      "Unit economics",
      "Execution risk",
      "Narrative versus evidence",
    ],
    cta: "Request an Operator Perspective",
    disclaimer:
      "Strategic and commercial analysis only. Jimmy Manalel does not provide regulated financial advice, securities recommendations or investment-brokerage services.",
  },
  {
    id: "ecosystems",
    to: `${ROUTES.asiaGcc}#ecosystems`,
    accent: "border-l-emerald-500/40",
    heading: "Build programmes that create real market movement.",
    offering: "Cross-Border Founder Programmes",
    focus: [
      "Founder cohorts",
      "Market-entry programmes",
      "Mentoring",
      "Pitch readiness",
      "Ecosystem roundtables",
      "Delegations",
      "Demo days",
      "Corridor partnerships",
    ],
    cta: "Build a Corridor Programme",
    disclaimer: null,
  },
];

export default function CorridorPathways() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {pathways.map((p) => (
        <article
          key={p.id}
          id={p.id}
          className={`scroll-mt-24 rounded-2xl border border-[#1f1f1f] bg-[#0b0b0b] p-6 border-l-2 ${p.accent} flex flex-col`}
        >
          <p className="serif-italic text-base md:text-lg text-zinc-200 leading-snug">{p.heading}</p>
          <p className="mt-3 text-xs font-mono uppercase tracking-wider text-amber-500/90">
            {p.offering}
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.focus.map((f) => (
              <li
                key={f}
                className="rounded-full border border-[#1f1f1f] px-2 py-0.5 text-[10px] font-mono text-zinc-500"
              >
                {f}
              </li>
            ))}
          </ul>
          {p.disclaimer ? (
            <p className="mt-4 text-[10px] leading-relaxed text-zinc-500 border border-[#1f1f1f] rounded-xl p-3">
              {p.disclaimer}
            </p>
          ) : null}
          <Link
            to={p.to}
            className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-amber-500 hover:text-amber-400 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
          >
            {p.cta}
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );
}
