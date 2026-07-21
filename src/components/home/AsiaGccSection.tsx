import React from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import CorridorFlows from "../corridor/CorridorFlows";
import CorridorPathways from "../corridor/CorridorPathways";
import { ASIA_FOCUS_LINE, CORRIDOR_SCOPE_STATEMENT } from "../../lib/entity";
import { ROUTES } from "../../lib/siteRoutes";

/**
 * Premium editorial Asia–GCC thesis on the homepage.
 */
export default function AsiaGccSection() {
  return (
    <section
      className="space-y-10"
      aria-labelledby="asia-gcc-heading"
      id="asia-gcc-home"
    >
      <div className="rounded-3xl border border-[#1f1f1f] bg-gradient-to-br from-[#0a0c12] via-[#0b0b0b] to-[#0d0d0d] p-6 md:p-10 space-y-6">
        <p className="inline-flex px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
          Asia–GCC Venture Corridors
        </p>
        <h2
          id="asia-gcc-heading"
          className="text-2xl md:text-4xl font-display font-medium text-white tracking-tight max-w-3xl leading-tight"
        >
          The next generation of ventures will be built across corridors—not within borders.
        </h2>
        <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-3xl">
          Market-entry strategy, operator-led commercial assessment, investor narrative, distribution
          thinking and execution readiness—for founders, investors and ecosystem partners evaluating
          commercial pathways between Asia, India and the GCC.
        </p>
        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed max-w-2xl">
          {CORRIDOR_SCOPE_STATEMENT}
        </p>
        <p className="text-[11px] md:text-xs text-zinc-600 leading-relaxed font-mono max-w-2xl">
          Built and operated in the UAE for more than a decade · Mentored 800+ founders through
          1trepreneur · Co-created 1Tank at Expand North Star
        </p>
        <p className="text-xs text-zinc-500">{ASIA_FOCUS_LINE}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-600">
          Strategic flows
        </h3>
        <CorridorFlows />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-600">
          Audience pathways
        </h3>
        <CorridorPathways />
      </div>

      <div>
        <Link
          to={ROUTES.asiaGcc}
          className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-400 hover:text-amber-500 transition"
        >
          Explore the full Asia–GCC corridor page
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
