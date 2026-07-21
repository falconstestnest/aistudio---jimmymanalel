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
import { ROUTES } from "../lib/siteRoutes";

const services = [
  {
    title: "Founder Strategic Advisory",
    desc: "High-leverage support on cross-border business models, narrative positioning, and strategic ecosystem alignment.",
    actionLabel: "Request Strategy Session",
    badge: "Strategic Access",
    to: ROUTES.strategyConversation,
  },
  {
    title: "Investor Narrative Architecture",
    desc: "Structured review of your institutional story, investor decks, and fundability variables across regional corridors.",
    actionLabel: "Run Narrative Diagnostic",
    badge: "Venture Capital Ready",
    to: ROUTES.narrativeGrader,
  },
  {
    title: "Venture Readiness Intensive",
    desc: "A deep, high-touch engagement to construct expansion narratives, model-unit cohesion, and global investor pipelines.",
    actionLabel: "Apply for Intensive",
    badge: "Accelerator Grade",
    to: ROUTES.advisory,
  },
  {
    title: "Commerce Infrastructure Review",
    desc: "Audit logistics economics, cross-border multi-node warehousing, SLA optimization, and margin preservation.",
    actionLabel: "Run Infrastructure Audit",
    badge: "Enterprise Scale",
    to: ROUTES.commerceAudit,
  },
  {
    title: "GCC Expansion Pathways",
    desc: "Bespoke market entry frameworks, local ecosystem structures, regulatory corridors, and strategic distribution networks across the GCC.",
    actionLabel: "Request Pathway Access",
    badge: "Corridor Expansion",
    to: ROUTES.advisory,
  },
];

export default function HomePage() {
  return (
    <PageShell homeSectionLinks>
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
              Jimmy Manalel is a venture corridor builder and cross-border startup strategist. Founder
              of <strong>Plantshop.ae</strong> (pioneering GCC e-commerce platform and 500 Global
              portfolio startup), he works at the intersection of early-stage builders, capital
              networks, and market entry corridors — helping startups shape investor narratives,
              strengthen commerce infrastructure, and expand across the GCC, India, and global venture
              hubs.
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
                    Plantshop.ae Co-Founder (500 Global backed)
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
                Portfolio & Accelerator
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
                80+ Startups
              </div>
              <div className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1.5">
                Supported & Guided
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
                  title: "Founder of Plantshop.ae",
                  body: "First-principles builder of GCC e-commerce botany logistics across regional microclimates to leading scale, backed by global institutions.",
                },
                {
                  title: "Backed by 500 Global",
                  body: "Formally trained in Silicon Valley distribution framework modeling, investor alignments, and institutional diligence cycles.",
                },
                {
                  title: "Founder of 1trepreneur",
                  body: "Mobilizing a high-agency corridor network of global operators, organizing strategic summits, and unblocking investor-readiness bottlenecks.",
                },
                {
                  title: "Startup Platform Advocacy",
                  body: "Working closely with incubators, regional funds, and cross-border corridors to navigate regulatory access and deal distribution loops.",
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
                  title: "The Middle East ↔ India Venture Corridor",
                  body: "Designing organic pipelines to streamline product validation, local licensing routing, and funding eligibility across emerging ecosystems.",
                },
                {
                  title: "1trepreneur Strategic Infrastructure",
                  body: "Developing open-source scaling playbooks, margin audit simulators, and modular data-room standards to replace low-yield consultancy.",
                },
                {
                  title: "Strategic Multi-Node Commerce Logistics",
                  body: "Assisting cross-border brands to audit and construct cold-chain structures, preventing inventory leaks and last-mile SLA degradation.",
                },
                {
                  title: "Elite Founder Gatherings & Roundtables",
                  body: "Curating invite-only, high-density summits connecting operators directly with institutional heads and capital syndicates.",
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
              Strategic Access Pathways
            </h2>
            <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-2xl mx-auto">
              Unlock cross-border launchpads, institutional narrative architecture, and audited
              commerce infrastructure designed for sovereign startup operators.
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
            <h2 className="text-xl font-sans font-bold text-white">Work with Jimmy</h2>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Advisory for investor narrative, venture readiness, commerce infrastructure, and GCC
              expansion pathways.
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
      </main>
    </PageShell>
  );
}
