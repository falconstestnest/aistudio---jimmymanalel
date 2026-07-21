import React from "react";
import { Link } from "react-router";
import PageShell from "../layout/PageShell";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import JsonLd from "../seo/JsonLd";
import { PERSON_NAME, PERSON_DESCRIPTION_SHORT } from "../../lib/entity";
import { ROUTES } from "../../lib/siteRoutes";

type ContentArticleProps = {
  crumbs: Crumb[];
  badge?: string;
  title: string;
  lead: string;
  children: React.ReactNode;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  related?: Array<{ to: string; label: string; description: string }>;
};

/**
 * Shared layout for long-form AEO pages: breadcrumb, H1, lead answer, body, related links.
 */
export default function ContentArticle({
  crumbs,
  badge,
  title,
  lead,
  children,
  jsonLd,
  related,
}: ContentArticleProps) {
  return (
    <PageShell>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <article className="max-w-3xl space-y-8">
          <Breadcrumbs items={crumbs} />
          <header className="space-y-4">
            {badge ? (
              <p className="inline-flex px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
                {badge}
              </p>
            ) : null}
            <h1 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              {title}
            </h1>
            <p className="text-base md:text-lg text-zinc-300 leading-relaxed">{lead}</p>
            <p className="text-xs text-zinc-500 font-mono">
              By {PERSON_NAME} ·{" "}
              <Link
                to={ROUTES.about}
                className="text-amber-500 hover:text-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
              >
                About
              </Link>
            </p>
          </header>

          <div className="prose-jm space-y-6 text-sm md:text-base text-zinc-400 leading-relaxed [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-sans [&_h2]:font-bold [&_h2]:text-white [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-sans [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_strong]:text-zinc-200 [&_a]:text-amber-500 [&_a]:underline-offset-2 hover:[&_a]:underline">
            {children}
          </div>

          {related && related.length > 0 ? (
            <aside className="border-t border-[#1f1f1f] pt-8 space-y-4" aria-label="Related pages">
              <h2 className="text-lg font-sans font-bold text-white">Related pages</h2>
              <ul className="space-y-3">
                {related.map((r) => (
                  <li key={r.to}>
                    <Link
                      to={r.to}
                      className="block rounded-xl border border-[#1f1f1f] bg-[#0b0b0b] p-4 hover:border-amber-500/30 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                    >
                      <span className="font-semibold text-white">{r.label}</span>
                      <span className="block text-sm text-zinc-500 mt-1">{r.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          <p className="text-xs text-zinc-600 leading-relaxed border-t border-[#1f1f1f] pt-6">
            {PERSON_DESCRIPTION_SHORT} This page is general information for founders and partners. It
            is not legal, financial, investment, or regulatory advice.
          </p>
        </article>
      </main>
    </PageShell>
  );
}
