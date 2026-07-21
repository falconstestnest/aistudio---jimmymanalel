import React from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "../../lib/siteRoutes";

const audiences = [
  "Founders",
  "Investors",
  "Family offices",
  "Accelerators",
  "Incubators",
  "Government ecosystem organisations",
  "Corporate innovation teams",
  "Strategic partners",
] as const;

/**
 * Premium pathway into strategy conversation — accurate, non-brokerage language.
 */
export default function EcosystemNavigation() {
  return (
    <section
      className="scroll-mt-24 rounded-3xl border border-[#1f1f1f] bg-gradient-to-br from-[#0a0c12] via-[#0b0b0b] to-[#090909] p-6 md:p-10 space-y-6"
      id="ecosystem-navigation"
      aria-labelledby="ecosystem-navigation-heading"
    >
      <div className="max-w-3xl space-y-3">
        <p className="text-sm font-mono text-amber-500/90 font-bold uppercase tracking-wider">
          Ecosystem Navigation
        </p>
        <h2
          id="ecosystem-navigation-heading"
          className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight"
        >
          Build the relationships required to cross markets.
        </h2>
        <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
          For founders, capital partners and ecosystem institutions exploring serious commercial
          movement between Asia, India and the GCC.
        </p>
      </div>

      <ul className="flex flex-wrap gap-2">
        {audiences.map((a) => (
          <li
            key={a}
            className="rounded-full border border-[#1f1f1f] bg-black/30 px-3 py-1 text-[11px] font-mono text-zinc-500"
          >
            {a}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Link
          to={`${ROUTES.strategyConversation}#booking-section`}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          Request Strategic Corridor Access
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      <p className="text-[11px] text-zinc-600 leading-relaxed max-w-2xl">
        Requests are reviewed individually. Not a guarantee of acceptance, introductions, investor
        access, government endorsement or regulated investment services.
      </p>
    </section>
  );
}
