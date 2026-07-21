import React from "react";
import { Link } from "react-router";
import { ChevronRight, FileCheck2 } from "lucide-react";
import { ROUTES } from "../../lib/siteRoutes";

/**
 * Homepage preview only — does not import the Narrative Grader tool.
 * Links out to the lazy-loaded venture-tools route.
 */
export default function FounderWorkspacePreview() {
  const areas = [
    "Narrative structure",
    "Fundability signals",
    "Market positioning",
    "Investor clarity",
    "Corridor relevance",
  ];

  return (
    <section
      className="space-y-6 scroll-mt-24"
      id="founder-workspace"
      aria-labelledby="founder-workspace-heading"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-mono text-zinc-500 font-bold uppercase tracking-wider">
          Founder Workspace
        </p>
        <h2
          id="founder-workspace-heading"
          className="text-2xl md:text-3xl font-display font-semibold text-white mt-1 tracking-tight"
        >
          Tools for clearer founder decisions.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <article className="lg:col-span-8 rounded-3xl border border-[#1f1f1f] bg-gradient-to-br from-[#0c0c0c] via-[#0b0b0b] to-[#090909] p-6 md:p-8 flex flex-col">
          <div className="flex items-start gap-3 mb-4">
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2.5">
              <FileCheck2 className="w-5 h-5 text-amber-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                Featured tool
              </p>
              <h3 className="text-xl font-sans font-bold text-white mt-0.5">Narrative Grader</h3>
            </div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
            Score and strengthen investor narrative structure, fundability signals and corridor
            positioning.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {areas.map((a) => (
              <li
                key={a}
                className="rounded-full border border-[#1f1f1f] bg-black/40 px-3 py-1 text-[11px] font-mono text-zinc-500"
              >
                {a}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6 flex flex-wrap gap-3">
            <Link
              to={ROUTES.narrativeGrader}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black px-5 py-2.5 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              Open Narrative Grader
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to={ROUTES.ventureTools}
              className="inline-flex items-center gap-1 rounded-xl border border-[#1f1f1f] hover:bg-zinc-900 text-zinc-300 hover:text-white px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              View all Venture Tools
            </Link>
          </div>
        </article>

        <aside className="lg:col-span-4 rounded-3xl border border-[#1f1f1f] bg-[#0b0b0b] p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-600 mb-3">
              Workspace areas
            </p>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="border-l-2 border-amber-500/40 pl-3">Narrative structure</li>
              <li className="border-l-2 border-amber-500/40 pl-3">Fundability signals</li>
              <li className="border-l-2 border-amber-500/40 pl-3">Market positioning</li>
              <li className="border-l-2 border-amber-500/40 pl-3">Investor clarity</li>
              <li className="border-l-2 border-amber-500/40 pl-3">Corridor relevance</li>
            </ul>
          </div>
          <p className="mt-6 text-[11px] text-zinc-600 leading-relaxed">
            Conceptual areas only—no fake scores, invented companies or funding probability claims.
          </p>
        </aside>
      </div>
    </section>
  );
}
