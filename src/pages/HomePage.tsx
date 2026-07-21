/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router";
import {
  Award,
  Users,
  TrendingUp,
  Zap,
  ChevronRight,
  MessageSquare,
  FileCheck2,
  Calculator,
  CalendarCheck2,
  Briefcase,
  Handshake,
} from "lucide-react";
import AboutTimeline from "../components/AboutTimeline";
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
      "A venture corridor builder connects founders, capital, distribution, and ecosystem partners across markets—so startups can expand with clearer partners and operating plans. Jimmy focuses on pathways linking India, the GCC, and the Middle East.",
  },
  {
    question: "What does Jimmy Manalel help founders with?",
    answer:
      "Investor narrative, venture readiness, commerce infrastructure and unit economics, GCC market-entry framing, and strategic partnership introductions where relevant.",
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d0d0d] border border-[#1f1f1f] p-8 md:p-12 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 animate-pulse" />

          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
              <Zap className="w-3 h-3 text-amber-500" />
              Venture Corridor Builder
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
              Venture corridor builder connecting{" "}
              <strong className="serif-italic text-amber-500 font-serif font-normal">
                founders, ecosystems,
              </strong>{" "}
              and market expansion pathways.
            </h1>

            <p className="text-zinc-400 font-sans text-sm md:text-base leading-relaxed max-w-3xl">
              {PERSON_DESCRIPTION_MEDIUM}{" "}
              <Link
                to={ROUTES.about}
                className="text-amber-500 hover:text-amber-400 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
              >
                Read the full background
              </Link>
              .
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to={ROUTES.ventureTools}
                className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl text-sm font-sans font-bold inline-flex items-center gap-2 group transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                id="hero-launch-bot"
              >
                <span>Explore Founder Tools</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition motion-reduce:transform-none" />
              </Link>
              <Link
                to={ROUTES.commerceAudit}
                className="px-6 py-3 border border-[#1f1f1f] hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-xl text-sm font-sans font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                id="hero-operations-calc"
              >
                Analyze Store Economics
              </Link>
              <Link
                to={ROUTES.about}
                className="px-6 py-3 border border-[#1f1f1f] hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-xl text-sm font-sans font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                About Jimmy
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 bg-[#090909] rounded-2xl border border-[#1f1f1f] flex flex-col justify-between h-72">
            <div className="space-y-4">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold">
                Venture Footprint
              </div>
              <div className="space-y-3">
                <div className="flex gap-2.5 items-start">
                  <Award className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-zinc-300 font-medium">
                    Plantshop.ae co-founder (company entered 500 Global programme)
                  </span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Users className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-zinc-300 font-medium font-sans">
                    Guided founders across GCC & emerging ecosystems
                  </span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <TrendingUp className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-zinc-300 font-medium">
                    Active in networks bridging GCC & Indian corridors
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#1f1f1f]/60 pt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                  Venture Networks:
                </span>
                <span className="text-xs font-sans font-bold text-zinc-300">
                  GCC, India & Global Corridors
                </span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse border-2 border-[#090909] shadow-sm" />
            </div>
          </div>
        </section>

        <section className="bg-[#090909] rounded-2xl border border-[#1f1f1f]/80 py-8 px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-display font-bold text-amber-500">
                500 Global
              </div>
              <div className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1.5">
                Plantshop programme
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-display font-bold text-amber-500">
                10+ Years
              </div>
              <div className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1.5">
                Ecosystem Operations
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-display font-bold text-amber-500">
                GCC & India
              </div>
              <div className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1.5">
                Bilateral Corridors
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-display font-bold text-amber-500">
                800+ Founders Mentored
              </div>
              <div className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1.5 max-w-[14rem] mx-auto leading-snug">
                Through 1trepreneur founder community programmes, meetups, mentoring sessions and
                ecosystem initiatives in Dubai.
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div id="journey-header" className="scroll-mt-24 text-center">
            <p className="text-sm font-mono text-zinc-500 font-bold uppercase tracking-wider">
              The Operator Track Record
            </p>
            <h2 className="text-3xl font-display font-semibold text-white mt-1">My Journey</h2>
          </div>
          <AboutTimeline />
        </section>

        <section
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-mt-24"
          id="ecosystem-engagement"
        >
          <div className="bg-[#0b0b0b] rounded-2xl border border-[#1f1f1f] p-6 md:p-8 space-y-6">
            <div>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-xs font-mono font-semibold tracking-wider uppercase">
                Global Venture Networks
              </span>
              <h2 className="text-2xl font-sans font-bold tracking-tight text-white mt-3">
                Ecosystem engagement
              </h2>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed mt-2">
                Active strategic participant inside key growth gateways, bridging startup diplomacy
                with real-world distribution.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              {[
                {
                  title: "Co-founder of Plantshop.ae",
                  body: "Built online plants and gardening commerce in the UAE, with operational focus on inventory, delivery, and unit economics. Plantshop later entered the 500 Global accelerator programme.",
                },
                {
                  title: "500 Global programme (via Plantshop)",
                  body: "Plantshop’s accelerator experience intensified fundraising scrutiny, board alignment, and investor narrative pressure—not a claim that Jimmy is a 500 Global partner or investor.",
                },
                {
                  title: "Co-founder of 1trepreneur",
                  body: "Dubai founder community built on peer mentoring, meetups, and practical startup support. Through the community and its programmes, Jimmy has mentored more than 800 founders.",
                },
                {
                  title: "Co-created 1Tank at Expand North Star",
                  body: "Helped create and conduct 1Tank, a pitch competition at Expand North Star in Dubai connecting selected founders with investors and ecosystem leaders.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3.5 items-start p-3 hover:bg-zinc-950 rounded-xl transition border border-transparent hover:border-[#1f1f1f]"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-sans font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-zinc-400 mt-1">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b0b0b] rounded-2xl border border-[#1f1f1f] p-6 md:p-8 space-y-6">
            <div>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-xs font-mono font-semibold tracking-wider uppercase">
                Active Projects & Pipelines
              </span>
              <h2 className="text-2xl font-sans font-bold tracking-tight text-white mt-3">
                Mobilizing & building
              </h2>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed mt-2">
                We are never static advisors. We actively architect and deploy real-world channels and
                resources for ambitious builders.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              {[
                {
                  title: "India ↔ Middle East venture corridors",
                  body: "Connecting founders, capital conversations, and market-entry pathways between India, the GCC, and related ecosystems.",
                },
                {
                  title: "1trepreneur community programmes",
                  body: "Peer mentorship, founder meetups, speed mentoring, and ecosystem activities organised with the Dubai founder community.",
                },
                {
                  title: "Commerce infrastructure clarity",
                  body: "Helping founders examine logistics cost, margins, and multi-node operations before scaling marketing or expansion claims.",
                },
                {
                  title: "1Tank pitch competition",
                  body: "Co-created 1Tank at Expand North Star, giving selected startups a stage format to present to investors and ecosystem leaders.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3.5 items-start p-3 hover:bg-zinc-950 rounded-xl transition border border-transparent hover:border-[#1f1f1f]"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-sans font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-zinc-400 mt-1">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div id="services-header" className="scroll-mt-24 text-center">
            <span className="px-3 py-1 bg-[#0d0d0d] border border-[#1f1f1f] text-amber-500 rounded-full text-xs font-mono font-medium uppercase tracking-wider">
              Venture Pipelines
            </span>
            <h2 className="text-3xl font-sans font-bold text-white mt-2">
              How founders work with Jimmy
            </h2>
            <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-2xl mx-auto">
              Clear entry points for advisory, narrative, commerce operations, and GCC expansion—
              each linked to a full explanation or tool.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <div
                key={svc.title}
                className="bg-[#0b0b0b] border border-[#1f1f1f] p-6 md:p-8 rounded-2xl shadow-sm hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/[0.02] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                      SERVICE 0{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded text-[10px] font-mono font-medium">
                      {svc.badge}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-lg md:text-xl text-white mb-2 group-hover:text-amber-400 transition-colors duration-255">
                    {svc.title}
                  </h3>
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6">{svc.desc}</p>
                </div>

                <Link
                  to={svc.to}
                  className="w-full py-2.5 border border-[#1f1f1f] group-hover:border-amber-500/20 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 mt-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  <span>{svc.actionLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Tools preview — full workspace lives on /venture-tools */}
        <section className="space-y-6" aria-labelledby="tools-preview-heading">
          <div className="text-center">
            <span className="px-3 py-1 bg-[#0d0d0d] border border-[#1f1f1f] text-amber-500 rounded-full text-xs font-mono font-medium uppercase tracking-wider">
              Operator Toolkit
            </span>
            <h2 id="tools-preview-heading" className="text-3xl font-sans font-bold text-white mt-2">
              Founder strategy tools
            </h2>
            <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-2xl mx-auto">
              Open the venture workspace for corridor dialogue, narrative grading, and commerce
              infrastructure analytics — each tool has its own shareable URL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                to: ROUTES.dialogue,
                icon: MessageSquare,
                title: "Corridor Dialogue",
                body: "Pressure-test positioning and expansion logic with a founder strategy dialogue.",
              },
              {
                to: ROUTES.narrativeGrader,
                icon: FileCheck2,
                title: "Narrative Grader",
                body: "Score investor narrative clarity, fundability signals, and corridor fit.",
              },
              {
                to: ROUTES.commerceAudit,
                icon: Calculator,
                title: "Infrastructure Analytics",
                body: "Model logistics density, SLA risk, and margin leaks across multi-node commerce.",
              },
            ].map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="bg-[#0b0b0b] border border-[#1f1f1f] p-6 rounded-2xl hover:border-amber-500/30 transition group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                <tool.icon className="w-5 h-5 text-amber-500 mb-3" aria-hidden="true" />
                <h3 className="font-sans font-bold text-white group-hover:text-amber-400 transition">
                  {tool.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{tool.body}</p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to={ROUTES.ventureTools}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              Explore Founder Tools
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Topic hub for answer engines and humans */}
        <section className="space-y-6" aria-labelledby="topics-heading">
          <div className="text-center max-w-2xl mx-auto">
            <h2 id="topics-heading" className="text-3xl font-sans font-bold text-white">
              Topics explained in full
            </h2>
            <p className="text-zinc-400 text-sm md:text-base mt-2">
              Direct, crawlable pages that answer common founder questions in plain language.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                to: ROUTES.about,
                title: "About Jimmy Manalel",
                body: "Background, Plantshop.ae, 500 Global programme context, and current work.",
              },
              {
                to: ROUTES.ventureCorridors,
                title: "Venture corridor building",
                body: "What corridors are and how India–GCC founder pathways work.",
              },
              {
                to: ROUTES.gccMarketEntry,
                title: "GCC market entry",
                body: "Challenges, partnerships, licensing caveats, and common mistakes.",
              },
              {
                to: ROUTES.investorNarrative,
                title: "Investor narrative architecture",
                body: "Story versus evidence, metrics, and readiness.",
              },
              {
                to: ROUTES.commerceInfrastructure,
                title: "Commerce infrastructure",
                body: "Unit economics, fulfilment, inventory, and margins.",
              },
              {
                to: ROUTES.partnerships,
                title: "Partnerships",
                body: "Speaking, programmes, communities, and strategic collaboration.",
              },
            ].map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="rounded-2xl border border-[#1f1f1f] bg-[#0b0b0b] p-5 hover:border-amber-500/30 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                <h3 className="font-sans font-bold text-white">{t.title}</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{t.body}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Conversion teasers */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Link
            to={ROUTES.strategyConversation}
            className="bg-[#0d0d0d] border border-[#1f1f1f] p-6 md:p-8 rounded-2xl hover:border-amber-500/30 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            <CalendarCheck2 className="w-5 h-5 text-amber-500 mb-3" aria-hidden="true" />
            <h2 className="text-xl font-sans font-bold text-white">Strategy conversation</h2>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Request preferred timing for a founder strategy discussion. This is a request — not an
              automatically confirmed calendar booking.
            </p>
            <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-amber-500">
              Request a conversation <ChevronRight className="w-4 h-4" />
            </span>
          </Link>

          <Link
            to={ROUTES.advisory}
            className="bg-[#0d0d0d] border border-[#1f1f1f] p-6 md:p-8 rounded-2xl hover:border-amber-500/30 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            <Briefcase className="w-5 h-5 text-amber-500 mb-3" aria-hidden="true" />
            <h2 className="text-xl font-sans font-bold text-white">Startup &amp; GCC advisory</h2>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Who advisory is for, what is included, what is not, and how to enquire.
            </p>
            <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-amber-500">
              Open advisory enquiry <ChevronRight className="w-4 h-4" />
            </span>
          </Link>

          <Link
            to={ROUTES.partnerships}
            className="bg-[#0d0d0d] border border-[#1f1f1f] p-6 md:p-8 rounded-2xl hover:border-amber-500/30 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            <Handshake className="w-5 h-5 text-amber-500 mb-3" aria-hidden="true" />
            <h2 className="text-xl font-sans font-bold text-white">Partnerships</h2>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Speaking, founder-community collaboration, ecosystem programmes, and strategic
              introductions.
            </p>
            <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-amber-500">
              Partnership enquiry <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </section>

        <FaqSection title="Answers for founders and partners" items={homeFaqs} />
      </main>
    </PageShell>
  );
}
