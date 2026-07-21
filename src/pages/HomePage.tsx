/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router";
import {
  ChevronRight,
  MessageSquare,
  FileCheck2,
  Calculator,
} from "lucide-react";
import AboutTimeline from "../components/AboutTimeline";
import AsiaGccSection from "../components/home/AsiaGccSection";
import CorridorAtlas from "../components/corridor/CorridorAtlas";
import CorridorCredibility from "../components/corridor/CorridorCredibility";
import PrivateConversationClose from "../components/corridor/PrivateConversationClose";
import PageShell from "../components/layout/PageShell";
import FaqSection from "../components/content/FaqSection";
import JsonLd from "../components/seo/JsonLd";
import {
  PERSON_DESCRIPTION_MEDIUM,
  PERSON_ID,
  faqPageJsonLd,
  onetrepreneurOrgJsonLd,
  personJsonLd,
  websiteJsonLd,
} from "../lib/entity";
import { ROUTES, SITE_ORIGIN } from "../lib/siteRoutes";

const services = [
  {
    title: "Founder strategic advisory",
    desc: "Support on cross-border business models, positioning, and practical next steps for founders.",
    actionLabel: "Request a strategy conversation",
    badge: "Advisory",
    to: ROUTES.strategyConversation,
  },
  {
    title: "Investor narrative architecture",
    desc: "Structure the story investors need: problem, evidence, economics, risks, and ask.",
    actionLabel: "Read about investor narrative",
    badge: "Narrative",
    to: ROUTES.investorNarrative,
  },
  {
    title: "Venture readiness",
    desc: "Pressure-test whether your expansion and fundraising story holds under scrutiny.",
    actionLabel: "Open advisory enquiry",
    badge: "Readiness",
    to: ROUTES.advisory,
  },
  {
    title: "Commerce infrastructure review",
    desc: "Examine unit economics, logistics cost, inventory risk, and margin after delivery and CAC.",
    actionLabel: "Commerce infrastructure guide",
    badge: "Operations",
    to: ROUTES.commerceInfrastructure,
  },
  {
    title: "GCC expansion pathways",
    desc: "Frame market entry for the UAE and GCC: partnerships, distribution, and common mistakes.",
    actionLabel: "GCC market entry guide",
    badge: "Market entry",
    to: ROUTES.gccMarketEntry,
  },
];

const homeFaqs = [
  {
    question: "Who is Jimmy Manalel?",
    answer: PERSON_DESCRIPTION_MEDIUM,
  },
  {
    question: "What does a venture corridor builder do?",
    answer:
      "A venture corridor builder connects founders, capital, distribution, and ecosystem partners across markets—so startups can expand with clearer partners and operating plans. Jimmy’s current strategic focus includes pathways linking Singapore, Malaysia, Thailand, South Korea, India and the GCC.",
  },
  {
    question: "What does Jimmy Manalel help founders with?",
    answer:
      "Market-entry strategy, operator-led commercial assessment, investor narrative, distribution thinking, execution readiness, commerce infrastructure, and ecosystem programmes—without legal or regulated investment advice.",
  },
  {
    question: "How can a founder request a strategy conversation?",
    answer:
      "Use the strategy conversation form to share preferred timing and context. Requests are reviewed manually and are not automatic calendar bookings.",
  },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      onetrepreneurOrgJsonLd(),
      websiteJsonLd(),
      {
        "@type": "ProfilePage",
        "@id": `${SITE_ORIGIN}/#profile`,
        url: `${SITE_ORIGIN}/`,
        name: "Jimmy Manalel | Venture Corridor Builder & Cross-Border Startup Strategist",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        mainEntity: { "@id": PERSON_ID },
      },
      faqPageJsonLd(homeFaqs),
    ],
  };

  return (
    <PageShell homeSectionLinks>
      <JsonLd data={jsonLd} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16 md:space-y-20">
        {/* 1. Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d0d0d] border border-[#1f1f1f] p-6 md:p-10 rounded-3xl shadow-sm relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 motion-safe:animate-pulse"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-72 h-72 bg-sky-900/20 rounded-full blur-3xl -z-10"
            aria-hidden="true"
          />

          <div className="lg:col-span-6 space-y-5">
            <h1 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
              Venture corridor builder connecting{" "}
              <strong className="serif-italic text-amber-500 font-serif font-normal">
                founders, ecosystems,
              </strong>{" "}
              and market expansion pathways.
            </h1>

            <p className="text-zinc-400 font-sans text-sm md:text-base leading-relaxed max-w-xl">
              Building the strategy, narrative, operating readiness and relationships required for
              ventures to move across markets.
            </p>

            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              Asia · India · GCC
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to={ROUTES.asiaGcc}
                className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl text-sm font-sans font-bold inline-flex items-center gap-2 group transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Explore the Asia–GCC Corridor
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition motion-reduce:transform-none" />
              </Link>
              <Link
                to={ROUTES.strategyConversation}
                className="px-6 py-3 border border-[#1f1f1f] hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-xl text-sm font-sans font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Start a Private Conversation
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <CorridorAtlas />
          </div>
        </section>

        {/* 2. Compact operating credibility */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { k: "10+ years", v: "Building & operating in the UAE" },
            { k: "Plantshop.ae", v: "Co-founder · 500 Global programme (company)" },
            { k: "800+ founders", v: "Mentored via 1trepreneur in Dubai" },
            { k: "1Tank", v: "Co-created at Expand North Star" },
          ].map((item) => (
            <div
              key={item.k}
              className="rounded-xl border border-[#1f1f1f] bg-[#0b0b0b] px-4 py-3"
            >
              <p className="text-sm font-sans font-bold text-amber-500">{item.k}</p>
              <p className="text-[11px] text-zinc-500 mt-1 leading-snug">{item.v}</p>
            </div>
          ))}
        </div>

        {/* 3–4. Asia–GCC thesis + pathways */}
        <AsiaGccSection />

        {/* 5. Journey */}
        <section className="space-y-6">
          <div id="journey-header" className="scroll-mt-24 text-center">
            <p className="text-sm font-mono text-zinc-500 font-bold uppercase tracking-wider">
              The Operator Track Record
            </p>
            <h2 className="text-3xl font-display font-semibold text-white mt-1">My Journey</h2>
          </div>
          <AboutTimeline />
        </section>

        {/* 6. Services + tools */}
        <section className="space-y-8">
          <div id="services-header" className="scroll-mt-24 text-center">
            <span className="px-3 py-1 bg-[#0d0d0d] border border-[#1f1f1f] text-amber-500 rounded-full text-xs font-mono font-medium uppercase tracking-wider">
              Venture Pathways
            </span>
            <h2 className="text-3xl font-sans font-bold text-white mt-2">
              How founders work with Jimmy
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <div
                key={svc.title}
                className="bg-[#0b0b0b] border border-[#1f1f1f] p-6 md:p-8 rounded-2xl flex flex-col justify-between group hover:border-amber-500/30 transition"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                      0{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded text-[10px] font-mono">
                      {svc.badge}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white mb-2">{svc.title}</h3>
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6">{svc.desc}</p>
                </div>
                <Link
                  to={svc.to}
                  className="w-full py-2.5 border border-[#1f1f1f] hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <span>{svc.actionLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="tools-preview-heading">
          <div className="text-center">
            <h2 id="tools-preview-heading" className="text-2xl font-sans font-bold text-white">
              Founder strategy tools
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                to: ROUTES.dialogue,
                icon: MessageSquare,
                title: "Corridor Dialogue",
                body: "Pressure-test positioning and expansion logic.",
              },
              {
                to: ROUTES.narrativeGrader,
                icon: FileCheck2,
                title: "Narrative Grader",
                body: "Score investor narrative clarity and fundability signals.",
              },
              {
                to: ROUTES.commerceAudit,
                icon: Calculator,
                title: "Infrastructure Analytics",
                body: "Model logistics density and margin leaks in USD.",
              },
            ].map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="bg-[#0b0b0b] border border-[#1f1f1f] p-6 rounded-2xl hover:border-amber-500/30 transition group"
              >
                <tool.icon className="w-5 h-5 text-amber-500 mb-3" aria-hidden="true" />
                <h3 className="font-sans font-bold text-white group-hover:text-amber-400 transition">
                  {tool.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{tool.body}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 7. Ecosystem credentials */}
        <section
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-mt-24"
          id="ecosystem-engagement"
        >
          <div className="bg-[#0b0b0b] rounded-2xl border border-[#1f1f1f] p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-sans font-bold text-white">Ecosystem engagement</h2>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="border-l-2 border-amber-500/40 pl-3">
                Co-founder of Plantshop.ae — UAE e-commerce operations; company entered 500 Global
                programme.
              </li>
              <li className="border-l-2 border-amber-500/40 pl-3">
                Co-founded and helped run 1trepreneur — Dubai founder community; more than 800
                founders mentored through programmes.
              </li>
              <li className="border-l-2 border-amber-500/40 pl-3">
                Co-created 1Tank at Expand North Star — pitch competition connecting selected
                founders with investors and ecosystem leaders.
              </li>
            </ul>
          </div>
          <CorridorCredibility />
        </section>

        {/* 8. Private conversation */}
        <PrivateConversationClose />

        <FaqSection title="Answers for founders and partners" items={homeFaqs} />
      </main>
    </PageShell>
  );
}
