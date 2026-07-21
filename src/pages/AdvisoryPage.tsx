import React from "react";
import { Link } from "react-router";
import { Briefcase } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import Breadcrumbs from "../components/content/Breadcrumbs";
import FaqSection from "../components/content/FaqSection";
import JsonLd from "../components/seo/JsonLd";
import AdvisoryEnquiryForm from "../components/leads/AdvisoryEnquiryForm";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  personJsonLd,
  serviceJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "../lib/entity";
import { ROUTES, ROUTE_SEO } from "../lib/siteRoutes";

const faqs = [
  {
    question: "What does Jimmy Manalel help founders with?",
    answer:
      "Founder strategic advisory, investor narrative architecture, venture readiness, commerce infrastructure review, and GCC expansion pathways—focused on clarity of story, operating economics, and cross-border market logic.",
  },
  {
    question: "How can a founder request a strategy conversation?",
    answer:
      "Use the strategy conversation page to share preferred timing and context, or submit the advisory enquiry form on this page. Requests are reviewed manually; they are not automatic calendar bookings.",
  },
];

export default function AdvisoryPage() {
  const seo = ROUTE_SEO[ROUTES.advisory];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      websiteJsonLd(),
      webPageJsonLd({
        path: ROUTES.advisory,
        name: seo.title,
        description: seo.description,
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Advisory", path: ROUTES.advisory },
      ]),
      serviceJsonLd({
        name: "Startup and GCC expansion advisory",
        description: seo.description,
        path: ROUTES.advisory,
      }),
      faqPageJsonLd(faqs),
    ],
  };

  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
        <div className="max-w-3xl space-y-6">
          <Breadcrumbs items={[{ label: "Advisory" }]} />
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
              <Briefcase className="w-3 h-3" aria-hidden="true" />
              Advisory
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              Startup &amp; GCC expansion advisory
            </h1>
            <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
              Jimmy Manalel provides founder-facing advisory on cross-border strategy: clarifying
              investor narrative, testing venture readiness, reviewing commerce infrastructure, and
              framing GCC market-entry pathways. This is practical operator guidance—not legal,
              accounting, or investment brokerage.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-sans font-bold text-white">Who it is for</h2>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
              Early and growth-stage founders building products that may expand across India, the GCC,
              or other corridors; teams preparing investor conversations; and operators struggling with
              unit economics or market-entry clarity. It is less suitable for people seeking only a
              logo introduction without operating substance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-sans font-bold text-white">Problems addressed</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-zinc-400">
              <li>Unclear or contradictory investor story</li>
              <li>Expansion claims without logistics or margin reality</li>
              <li>Weak definition of customer, beachhead, and distribution</li>
              <li>Commerce models that grow revenue while destroying cash</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-sans font-bold text-white">Advisory areas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-300">
              {[
                {
                  label: "Founder strategic advisory",
                  to: ROUTES.strategyConversation,
                },
                {
                  label: "Investor narrative architecture",
                  to: ROUTES.investorNarrative,
                },
                {
                  label: "Venture readiness",
                  to: ROUTES.investorNarrative,
                },
                {
                  label: "Commerce infrastructure review",
                  to: ROUTES.commerceInfrastructure,
                },
                {
                  label: "GCC expansion pathways",
                  to: ROUTES.gccMarketEntry,
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="rounded-xl border border-[#1f1f1f] bg-[#0b0b0b] px-4 py-3 hover:border-amber-500/30 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-sans font-bold text-white">What engagements typically include</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-zinc-400">
              <li>Structured discussion of your current challenge</li>
              <li>Pressure-testing narrative, market logic, or economics</li>
              <li>Prioritised next steps founders can execute</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-sans font-bold text-white">What it does not include</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-zinc-400">
              <li>Legal opinions, company formation filings, or visa processing</li>
              <li>Guaranteed fundraising or investor commitments</li>
              <li>Regulated investment advice or portfolio management</li>
              <li>Automatic calendar confirmation without review</li>
            </ul>
          </section>

          <p className="text-sm text-zinc-400">
            Prefer a timed discussion first?{" "}
            <Link
              to={ROUTES.strategyConversation}
              className="text-amber-500 hover:text-amber-400 font-semibold"
            >
              Request a strategy conversation
            </Link>
            .
          </p>
        </div>

        <AdvisoryEnquiryForm />

        <div className="max-w-3xl">
          <FaqSection items={faqs} />
        </div>
      </main>
    </PageShell>
  );
}
