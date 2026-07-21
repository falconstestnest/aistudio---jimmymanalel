import React, { Suspense, lazy } from "react";
import { Link, useLocation } from "react-router";
import { Zap } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import { ROUTES, toolKeyFromPath } from "../lib/siteRoutes";
// Static import used only when SSR so prerender includes tool markup.
// Client navigations use the lazy path to keep tools out of first paint on other routes.
import VentureToolsWorkspaceStatic from "../components/tools/VentureToolsWorkspace";

const VentureToolsWorkspaceLazy = lazy(
  () => import("../components/tools/VentureToolsWorkspace")
);

export default function VentureToolsPage() {
  const { pathname } = useLocation();
  const activeTool = toolKeyFromPath(pathname);
  const isHub =
    pathname.replace(/\/+$/, "") === ROUTES.ventureTools || pathname === ROUTES.ventureTools;

  const workspace = import.meta.env.SSR ? (
    <VentureToolsWorkspaceStatic activeTool={activeTool} />
  ) : (
    <Suspense
      fallback={
        <div
          className="min-h-[320px] rounded-3xl border border-[#1f1f1f] bg-[#0d0d0d] flex items-center justify-center text-sm text-zinc-500"
          role="status"
        >
          Loading workspace…
        </div>
      }
    >
      <VentureToolsWorkspaceLazy activeTool={activeTool} />
    </Suspense>
  );

  return (
    <PageShell>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
            <Zap className="w-3 h-3" aria-hidden="true" />
            Founder workspace
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
            {isHub
              ? "Founder strategy tools"
              : activeTool === "dialogue"
                ? "Corridor Dialogue"
                : activeTool === "narrative-grader"
                  ? "Narrative Grader"
                  : "Commerce Infrastructure Audit"}
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            {isHub
              ? "Three practical tools for founders building across corridors: dialogue for strategic clarity, narrative grading for investor readiness, and commerce infrastructure audit for unit economics."
              : activeTool === "dialogue"
                ? "A founder strategy dialogue to pressure-test positioning, expansion logic, and venture narrative clarity."
                : activeTool === "narrative-grader"
                  ? "Score and strengthen investor narrative structure, fundability signals, and corridor positioning."
                  : "Audit logistics density, multi-node warehousing, SLA risk, and margin preservation for cross-border commerce."}
          </p>
          {!isHub && (
            <p className="text-xs text-zinc-500">
              <Link
                to={ROUTES.ventureTools}
                className="text-amber-500 hover:text-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
              >
                ← All founder tools
              </Link>
            </p>
          )}
        </header>

        {workspace}
      </main>
    </PageShell>
  );
}
