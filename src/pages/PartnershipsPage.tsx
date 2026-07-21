import React from "react";
import { Link } from "react-router";
import { Handshake } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import Breadcrumbs from "../components/content/Breadcrumbs";
import FaqSection from "../components/content/FaqSection";
import JsonLd from "../components/seo/JsonLd";
import PartnershipEnquiryForm from "../components/leads/PartnershipEnquiryForm";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  personJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "../lib/entity";
import { ROUTES, ROUTE_SEO } from "../lib/siteRoutes";

const faqs = [
  {
    question: "What partnership opportunities are available?",
    answer:
      "Speaking requests, founder-community collaboration, ecosystem partnerships, startup-programme collaboration, and strategic partnership discussions. Submit the form with your organisation and intent; each request is reviewed individually.",
  },
];

export default function PartnershipsPage() {
  const seo = ROUTE_SEO[ROUTES.partnerships];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      websiteJsonLd(),
      webPageJsonLd({
        path: ROUTES.partnerships,
        name: seo.title,
        description: seo.description,
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Partnerships", path: ROUTES.partnerships },
      ]),
      faqPageJsonLd(faqs),
    ],
  };

  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
        <div className="max-w-3xl space-y-6">
          <Breadcrumbs items={[{ label: "Partnerships" }]} />
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
              <Handshake className="w-3 h-3" aria-hidden="true" />
              Ecosystem collaboration
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              Ecosystem &amp; strategic partnerships
            </h1>
            <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
              Partnership enquiries are for organisers, programmes, communities, and operators who
              want to collaborate with Jimmy Manalel on speaking, founder gatherings, ecosystem
              programmes, or strategic introductions—aligned with cross-border corridor work across
              India, the GCC, and related markets.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-sans font-bold text-white">Types of collaboration</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-zinc-400">
              <li>
                <strong className="text-zinc-200">Speaking requests</strong> — panels, founder
                briefings, or workshops on narrative, corridors, or commerce operations
              </li>
              <li>
                <strong className="text-zinc-200">Founder-community collaboration</strong> — community
                programmes that need operator-led sessions
              </li>
              <li>
                <strong className="text-zinc-200">Ecosystem partnership</strong> — incubators,
                accelerators, or corridor initiatives seeking structured collaboration
              </li>
              <li>
                <strong className="text-zinc-200">Startup-programme collaboration</strong> — curriculum
                or mentor-style contributions where scope is clear
              </li>
              <li>
                <strong className="text-zinc-200">Strategic partnership</strong> — longer-term
                alignment that should be defined in writing after discussion
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-sans font-bold text-white">What to include in your enquiry</h2>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
              Organisation name, audience, date or timeline if known, location or format, and the
              outcome you want. Vague “let’s partner” messages without context are harder to action.
            </p>
          </section>

          <p className="text-sm text-zinc-400">
            Founders seeking personal advisory should use the{" "}
            <Link to={ROUTES.advisory} className="text-amber-500 font-semibold hover:text-amber-400">
              advisory enquiry
            </Link>{" "}
            or{" "}
            <Link
              to={ROUTES.strategyConversation}
              className="text-amber-500 font-semibold hover:text-amber-400"
            >
              strategy conversation
            </Link>{" "}
            forms instead.
          </p>
        </div>

        <PartnershipEnquiryForm />

        <div className="max-w-3xl">
          <FaqSection items={faqs} />
        </div>
      </main>
    </PageShell>
  );
}
