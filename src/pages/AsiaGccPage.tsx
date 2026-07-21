import React from "react";
import { Link } from "react-router";
import PageShell from "../components/layout/PageShell";
import Breadcrumbs from "../components/content/Breadcrumbs";
import FaqSection from "../components/content/FaqSection";
import JsonLd from "../components/seo/JsonLd";
import AsiaGccEnquiryForm from "../components/leads/AsiaGccEnquiryForm";
import CorridorAtlas from "../components/corridor/CorridorAtlas";
import CorridorFlows from "../components/corridor/CorridorFlows";
import CorridorPathways from "../components/corridor/CorridorPathways";
import CountryOpportunityMatrix from "../components/corridor/CountryOpportunityMatrix";
import CorridorReadinessFramework from "../components/corridor/CorridorReadinessFramework";
import CorridorCredibility from "../components/corridor/CorridorCredibility";
import PrivateConversationClose from "../components/corridor/PrivateConversationClose";
import {
  ASIA_FOCUS_LINE,
  CORRIDOR_SCOPE_STATEMENT,
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
    question: "What is an Asia–GCC venture corridor?",
    answer:
      "An Asia–GCC venture corridor is a practical set of commercial pathways connecting founders, investors, partners and startup ecosystems between Asian innovation markets and the Gulf—especially the UAE and wider GCC. It is about readiness, distribution, narrative and execution, not a claim of a single formal trade programme.",
  },
  {
    question: "How can a Singapore startup evaluate GCC expansion?",
    answer:
      "Validate beachhead customer and use case, pricing and willingness-to-pay, partnership or distribution options, unit economics after logistics and acquisition costs, and founder readiness for a second-market operating load. Treat GCC expansion as a sequence of commercial decisions—not only a pitch-slide ambition.",
  },
  {
    question: "What should Malaysian startups prepare before entering the UAE?",
    answer:
      "Clarify product-market fit evidence, margin after delivery and acquisition, local partnership logic, and which GCC country is the real beachhead. Prepare a narrative investors and partners can stress-test. Legal and licensing steps require licensed local counsel—not website advice.",
  },
  {
    question: "Which Thai business models may translate well into GCC markets?",
    answer:
      "Models with clear product differentiation in wellness, food and agriculture, consumer commerce, logistics, digital platforms, or health-related services can be candidates when unit economics and brand positioning travel. Translation still requires market-specific distribution and pricing work.",
  },
  {
    question: "How can Korean startups prepare for GCC commercialisation?",
    answer:
      "Strong product technology is necessary but not sufficient. Prepare commercial translation: market relevance, distribution strategy, partner logic, operating plan, and a narrative that explains why the Gulf customer should care now. This site does not claim a local Korean office or language service.",
  },
  {
    question: "What does operator-led commercial assessment include?",
    answer:
      "An operator’s perspective on founder quality, business-model clarity, operating discipline, unit economics, cross-border assumptions and commercial readiness. It is strategic and commercial analysis only—not regulated financial advice, securities recommendations or investment-brokerage services.",
  },
  {
    question: "Does Jimmy introduce startups directly to investors?",
    answer:
      "Conversations may include ecosystem context and readiness for capital discussions when appropriate. There is no promise of introductions, deal placement, fundraising guarantees or exclusive investor access.",
  },
  {
    question: "Does Jimmy provide legal or investment advice?",
    answer:
      "No. Work described on this site is operator-led strategy and commercial readiness. It is not legal, tax, visa, or regulated investment advice. Use licensed professionals for those matters.",
  },
  {
    question: "How can an accelerator create a GCC market-entry programme?",
    answer:
      "Define cohort criteria, readiness diagnostics, mentoring formats, narrative workshops, and clear outcomes for founders. Jimmy can help design corridor-focused programmes with ecosystem partners; delivery scope is agreed case by case.",
  },
];

const engagements = [
  {
    name: "GCC Readiness Diagnostic",
    outcome:
      "A structured view of market fit, economics, partnership logic and gaps before capital commitment.",
  },
  {
    name: "Cross-Border Strategy Sprint",
    outcome:
      "Focused working sessions to prioritise beachhead, narrative and next operating moves.",
  },
  {
    name: "Operator-Led Commercial Assessment",
    outcome:
      "Commercial and operational perspective for investors and family offices evaluating founders and models.",
  },
  {
    name: "Founder and Investor Narrative Review",
    outcome:
      "Pressure-test of story, evidence, risks and ask for cross-border expansion claims.",
  },
  {
    name: "Ecosystem Market-Access Programme",
    outcome:
      "Design support for cohorts, workshops and corridor-focused founder programmes.",
  },
  {
    name: "Private Strategy Conversation",
    outcome:
      "A reviewed request for discussion—not an automatic calendar booking or guaranteed engagement.",
  },
];

export default function AsiaGccPage() {
  const seo = ROUTE_SEO[ROUTES.asiaGcc];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      websiteJsonLd(),
      webPageJsonLd({
        path: ROUTES.asiaGcc,
        name: seo.title,
        description: seo.description,
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Asia–GCC corridors", path: ROUTES.asiaGcc },
      ]),
      serviceJsonLd({
        name: "Asia–GCC venture corridor strategy",
        description:
          "Market-entry strategy, operator-led commercial assessment, investor narrative, distribution thinking and execution readiness across Asia, India and the GCC.",
        path: ROUTES.asiaGcc,
      }),
      faqPageJsonLd(faqs),
    ],
  };

  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-4">
            <Breadcrumbs items={[{ label: "Asia–GCC corridors" }]} />
            <p className="inline-flex px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
              Asia–GCC venture corridors
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              Commercial pathways between Asia and the GCC
            </h1>
            <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
              An Asia–GCC venture corridor connects founders, investors, commercial partners and
              startup ecosystems across Asian innovation markets and the Gulf. Jimmy Manalel helps
              participants evaluate whether a business is ready to cross that corridor and what must
              be built before expansion.
            </p>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {CORRIDOR_SCOPE_STATEMENT} Market-entry strategy, operator-led commercial assessment,
              investor narrative, distribution thinking and execution readiness.
            </p>
            <p className="text-xs text-zinc-500">{ASIA_FOCUS_LINE}</p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              This is a strategic expansion focus—not a claim of offices or established client
              operations in every listed country.
            </p>
          </div>
          <div className="lg:col-span-6">
            <CorridorAtlas />
          </div>
        </div>

        <section className="max-w-3xl space-y-3" aria-labelledby="what-corridor">
          <h2 id="what-corridor" className="text-2xl font-sans font-bold text-white">
            What is an Asia–GCC venture corridor?
          </h2>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
            A corridor is a practical pathway that moves product, capital conversations, partnerships
            and know-how between markets—not a slogan. Between Asia and the GCC, that usually means
            testing whether a company’s economics, distribution logic, narrative and operating system
            can survive a second market, often with the UAE as a common beachhead.
          </p>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
            Related reading:{" "}
            <Link to={ROUTES.ventureCorridors} className="text-amber-500 hover:text-amber-400">
              venture corridor building
            </Link>
            ,{" "}
            <Link to={ROUTES.gccMarketEntry} className="text-amber-500 hover:text-amber-400">
              GCC market entry
            </Link>
            .
          </p>
        </section>

        <section className="max-w-3xl space-y-3" aria-labelledby="why-fail">
          <h2 id="why-fail" className="text-2xl font-sans font-bold text-white">
            Why strong companies fail during international expansion
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-zinc-400">
            <li>Home-market product strength mistaken for destination-market demand</li>
            <li>Pricing and margins that ignore logistics, acquisition and partnership cost</li>
            <li>Vague “GCC scale” narratives without a beachhead customer or operator plan</li>
            <li>Partnerships treated as logos instead of distribution and trust mechanisms</li>
            <li>Founding team capacity underestimated for a second-market load</li>
          </ul>
        </section>

        <section className="space-y-4" aria-labelledby="operator-approach">
          <h2 id="operator-approach" className="text-2xl font-sans font-bold text-white">
            Jimmy’s operator-led approach
          </h2>
          <CorridorCredibility />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-sans font-bold text-white">Strategic flows</h2>
          <CorridorFlows />
        </section>

        <section className="space-y-6" aria-labelledby="pathways">
          <h2 id="pathways" className="text-2xl font-sans font-bold text-white scroll-mt-24">
            Who this is for
          </h2>
          {/* Anchor IDs #audit #investors #ecosystems live on pathway cards */}
          <CorridorPathways />
        </section>

        <section className="space-y-4" aria-labelledby="country-focus">
          <h2 id="country-focus" className="text-2xl font-sans font-bold text-white">
            Country opportunity matrix
          </h2>
          <p className="max-w-3xl text-sm text-zinc-400 leading-relaxed">
            {ASIA_FOCUS_LINE} India and the GCC complete the corridor picture as connecting and
            destination layers—not a ranking of countries.
          </p>
          <CountryOpportunityMatrix />
        </section>

        <section className="space-y-4" aria-labelledby="framework">
          <h2 id="framework" className="text-2xl font-sans font-bold text-white">
            Corridor Readiness Framework
          </h2>
          <CorridorReadinessFramework />
        </section>

        <section className="max-w-3xl space-y-4" aria-labelledby="engagements">
          <h2 id="engagements" className="text-2xl font-sans font-bold text-white">
            Engagement formats
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Formats describe expected working modes and outcomes—not price lists or guarantees.
          </p>
          <ul className="space-y-3">
            {engagements.map((e) => (
              <li
                key={e.name}
                className="rounded-xl border border-[#1f1f1f] bg-[#0b0b0b] px-4 py-3"
              >
                <p className="text-sm font-semibold text-white">{e.name}</p>
                <p className="text-xs md:text-sm text-zinc-500 mt-1 leading-relaxed">{e.outcome}</p>
              </li>
            ))}
          </ul>
        </section>

        <FaqSection title="Frequently asked questions" items={faqs} />

        <AsiaGccEnquiryForm id="asia-gcc-enquiry" />

        <PrivateConversationClose />
      </main>
    </PageShell>
  );
}
