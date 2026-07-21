import React from "react";
import { Link } from "react-router";
import { CalendarCheck2 } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import Breadcrumbs from "../components/content/Breadcrumbs";
import FaqSection from "../components/content/FaqSection";
import JsonLd from "../components/seo/JsonLd";
import BookingForm from "../components/BookingForm";
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
    question: "How can a founder request a strategy conversation?",
    answer:
      "Complete the form on this page with your context and preferred weekday timing. Jimmy reviews requests and responds with next steps. It is a request, not an automatically confirmed calendar reservation.",
  },
];

export default function StrategyConversationPage() {
  const seo = ROUTE_SEO[ROUTES.strategyConversation];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      websiteJsonLd(),
      webPageJsonLd({
        path: ROUTES.strategyConversation,
        name: seo.title,
        description: seo.description,
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Strategy conversation", path: ROUTES.strategyConversation },
      ]),
      faqPageJsonLd(faqs),
    ],
  };

  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
        <div className="max-w-3xl space-y-4">
          <Breadcrumbs items={[{ label: "Strategy conversation" }]} />
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
              <CalendarCheck2 className="w-3 h-3" aria-hidden="true" />
              Strategy access
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              Request a strategy conversation
            </h1>
            <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
              Share what you want to discuss and your preferred timing. This is a{" "}
              <strong className="text-zinc-100 font-semibold">request</strong>, not an automatically
              confirmed calendar reservation. Jimmy reviews each enquiry and responds with next steps.
            </p>
            <ul className="text-sm text-zinc-400 space-y-1.5 list-disc list-inside">
              <li>Founder strategy and corridor positioning</li>
              <li>
                <Link to={ROUTES.investorNarrative} className="text-amber-500 hover:text-amber-400">
                  Investor narrative
                </Link>{" "}
                and readiness
              </li>
              <li>
                <Link to={ROUTES.gccMarketEntry} className="text-amber-500 hover:text-amber-400">
                  GCC expansion
                </Link>{" "}
                and{" "}
                <Link
                  to={ROUTES.commerceInfrastructure}
                  className="text-amber-500 hover:text-amber-400"
                >
                  commerce infrastructure
                </Link>
              </li>
            </ul>
          </header>
        </div>

        <BookingForm />

        <div className="max-w-3xl">
          <FaqSection items={faqs} />
        </div>
      </main>
    </PageShell>
  );
}
