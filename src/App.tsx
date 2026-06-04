/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  Sparkles, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Calculator, 
  Award, 
  Mail, 
  Linkedin, 
  ChevronRight, 
  Zap, 
  HelpCircle,
  FileCheck2,
  CalendarCheck2,
  Scale
} from "lucide-react";

// Sub-component imports
import AboutTimeline from "./components/AboutTimeline";
import ClarityAssistant from "./components/ClarityAssistant";
import PitchGrader from "./components/PitchGrader";
import EcomAuditCalculator from "./components/EcomAuditCalculator";
import BookingForm from "./components/BookingForm";
import GrowthMarketingHub from "./components/GrowthMarketingHub";

export default function App() {
  const [activeTab, setActiveTab] = useState<"chat" | "grader" | "calculator" | "growth">("chat");

  const services = [
    {
      title: "Founder Strategic Advisory",
      desc: "High-leverage support on cross-border business models, narrative positioning, and strategic ecosystem alignment.",
      actionLabel: "Request Strategy Session",
      badge: "Strategic Access",
      anchor: "booking-section"
    },
    {
      title: "Investor Narrative Architecture",
      desc: "Structured review of your institutional story, investor decks, and fundability variables across regional corridors.",
      actionLabel: "Run Narrative Diagnostic",
      badge: "Venture Capital Ready",
      anchor: "deck-section"
    },
    {
      title: "Venture Readiness Intensive",
      desc: "A deep, high-touch engagement to construct expansion narratives, model-unit cohesion, and global investor pipelines.",
      actionLabel: "Apply for Intensive",
      badge: "Accelerator Grade",
      anchor: "booking-section"
    },
    {
      title: "Commerce Infrastructure Review",
      desc: "Audit logistics economics, cross-border multi-node warehousing, SLA optimization, and margin preservation.",
      actionLabel: "Run Infrastructure Audit",
      badge: "Enterprise Scale",
      anchor: "calculator-section"
    },
    {
      title: "GCC Expansion Pathways",
      desc: "Bespoke market entry frameworks, local ecosystem structures, regulatory corridors, and strategic distribution networks across the GCC.",
      actionLabel: "Request Pathway Access",
      badge: "Corridor Expansion",
      anchor: "booking-section"
    }
  ];

  const handleSmoothScroll = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavToTab = (tab: "chat" | "grader" | "calculator" | "growth") => {
    setActiveTab(tab);
    setTimeout(() => {
      handleSmoothScroll("workspace-hub");
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-amber-500 selection:text-black antialiased">
      
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 bg-[#050505]/80 backdrop-blur-md border-b border-[#1f1f1f] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-black flex items-center justify-center font-display font-bold text-sm">
              JM
            </div>
            <div>
              <span className="font-display font-medium text-white tracking-tight text-sm sm:text-base leading-none block uppercase">
                Jimmy Manalel
              </span>
              <span className="text-[10px] font-mono text-amber-500 block mt-0.5 uppercase tracking-wider font-semibold">
                Founder • Venture Ecosystem Builder • Cross-Border Startup Strategist
              </span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-5 text-xs sm:text-sm font-medium text-zinc-400 font-sans">
            <button onClick={() => handleSmoothScroll("journey-header")} className="hover:text-white transition cursor-pointer">About</button>
            <button onClick={() => handleSmoothScroll("ecosystem-engagement")} className="hover:text-white transition cursor-pointer">Ecosystem</button>
            <button onClick={() => handleSmoothScroll("services-header")} className="hover:text-white transition cursor-pointer">Pathways</button>
            <button onClick={() => handleNavToTab("chat")} className="hover:text-white transition cursor-pointer">Dialogue</button>
            <button onClick={() => handleNavToTab("grader")} className="hover:text-white transition cursor-pointer">Narrative Grader</button>
            <button onClick={() => handleNavToTab("calculator")} className="hover:text-white transition cursor-pointer">Analytics</button>
            <button onClick={() => handleNavToTab("growth")} className="hover:text-white transition cursor-pointer text-amber-500 font-semibold">Growth & Leads</button>
          </nav>

          <button
            onClick={() => handleSmoothScroll("booking-section")}
            className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-xs md:text-sm font-sans font-bold cursor-pointer shadow-md transition-all"
            id="header-booking"
          >
            Book Clarity Session
          </button>
        </div>
      </header>

      {/* 2. Hero Editorial Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
        
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d0d0d] border border-[#1f1f1f] p-8 md:p-12 rounded-3xl shadow-sm relative overflow-hidden">
          {/* Subtle decoration lines */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 animate-pulse" />
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
              <Zap className="w-3 h-3 text-amber-500" />
               Cross-Border Venture Corridors
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
              Cross-border startup operator connecting <strong className="serif-italic text-amber-500 font-serif font-normal">founders, venture ecosystems,</strong> and market expansion pathways.
            </h1>
            
            <p className="text-zinc-400 font-sans text-sm md:text-base leading-relaxed max-w-3xl">
              Founder of <strong>Plantshop.ae</strong> (pioneering GCC e-commerce platform and 500 Global portfolio startup) and cross-border ecosystem operator. I operate at the intersection of early-stage builders, capital networks, and market entry corridors — helping startups navigate fundraising narratives, optimize commerce infrastructure, and orchestrate expansion between the GCC, India, and global venture hubs.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => handleSmoothScroll("workspace-hub")}
                className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl text-sm font-sans font-bold cursor-pointer inline-flex items-center gap-2 group transition"
                id="hero-launch-bot"
              >
                <span>Launch Venture Workspace</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={() => handleSmoothScroll("calculator-section")}
                className="px-6 py-3 border border-[#1f1f1f] hover:bg-zinc-900 text-zinc-350 hover:text-white rounded-xl text-sm font-sans font-semibold cursor-pointer transition"
                id="hero-operations-calc"
              >
                Analyze Store Economics
              </button>
            </div>
          </div>

          {/* Right Visual Bento Box */}
          <div className="lg:col-span-4 p-6 bg-[#090909] rounded-2xl border border-[#1f1f1f] flex flex-col justify-between h-72">
            <div className="space-y-4">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold">
                Venture Footprint
              </div>
              <div className="space-y-3">
                <div className="flex gap-2.5 items-start">
                  <Award className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-zinc-300 font-medium">Plantshop.ae Co-Founder (500 Global backed)</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Users className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-zinc-300 font-medium font-sans">Guided founders across GCC & emerging ecosystems</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <TrendingUp className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-zinc-300 font-medium">Active in networks bridging GCC & Indian corridors</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#1f1f1f]/60 pt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block uppercase">Venture Networks:</span>
                <span className="text-xs font-sans font-bold text-zinc-300">GCC, India & Global Corridors</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse border-2 border-[#090909] shadow-sm" />
            </div>
          </div>
        </section>

        {/* Global Social Proof Banner */}
        <section className="bg-[#090909] rounded-2xl border border-[#1f1f1f]/80 py-8 px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-display font-bold text-amber-500">500 Global</div>
              <div className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1.5">Portfolio & Accelerator</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-display font-bold text-amber-500">10+ Years</div>
              <div className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1.5">Ecosystem Operations</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-display font-bold text-amber-500">GCC & India</div>
              <div className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1.5">Bilateral Corridors</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-display font-bold text-amber-500">80+ Startups</div>
              <div className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1.5">Supported & Guided</div>
            </div>
          </div>
        </section>

        {/* 3. About & Interactive Timeline */}
        <section className="space-y-6">
          <div id="journey-header" className="scroll-mt-24 text-center">
            <h3 className="text-sm font-mono text-zinc-500 font-bold uppercase tracking-wider">The Operator Track Record</h3>
            <h2 className="text-3xl font-display font-semibold text-white mt-1">My Journey</h2>
          </div>
          <AboutTimeline />
        </section>

        {/* Venture Ecosystem Engagement & What I'm Mobilizing/Building */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-mt-24" id="ecosystem-engagement">
          <div className="bg-[#0b0b0b] rounded-2xl border border-[#1f1f1f] p-6 md:p-8 space-y-6">
            <div>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-xs font-mono font-semibold tracking-wider uppercase">
                Global Venture Networks
              </span>
              <h2 className="text-2xl font-sans font-bold tracking-tight text-white mt-3">
                Ecosystem engagement
              </h2>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed mt-2">
                Active strategic participant inside key growth gateways, bridging startup diplomacy with real-world distribution.
              </p>
            </div>
            
            <div className="space-y-3.5 pt-2">
              <div className="flex gap-3.5 items-start p-3 hover:bg-zinc-950 rounded-xl transition border border-transparent hover:border-[#1f1f1f]">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-sans font-bold text-white">Founder of Plantshop.ae</h4>
                  <p className="text-xs text-zinc-400 mt-1">First-principles builder of GCC e-commerce botany logistics across regional microclimates to leading scale, backed by global institutions.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start p-3 hover:bg-zinc-950 rounded-xl transition border border-transparent hover:border-[#1f1f1f]">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-sans font-bold text-white">Backed by 500 Global</h4>
                  <p className="text-xs text-zinc-400 mt-1">Formally trained in Silicon Valley distribution framework modeling, investor alignments, and institutional diligence cycles.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start p-3 hover:bg-zinc-950 rounded-xl transition border border-transparent hover:border-[#1f1f1f]">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-sans font-bold text-white">Founder of 1trepreneur</h4>
                  <p className="text-xs text-zinc-400 mt-1">Mobilizing a high-agency corridor network of global operators, organizing strategic summits, and unblocking investor-readiness bottlenecks.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start p-3 hover:bg-zinc-950 rounded-xl transition border border-transparent hover:border-[#1f1f1f]">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-sans font-bold text-white">Startup Platform Advocacy</h4>
                  <p className="text-xs text-zinc-400 mt-1">Working closely with incubators, regional funds, and cross-border corridors to navigate regulatory access and deal distribution loops.</p>
                </div>
              </div>
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
                We are never static advisors. We actively architect and deploy real-world channels and resources for ambitious builders.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="flex gap-3.5 items-start p-3 hover:bg-zinc-950 rounded-xl transition border border-transparent hover:border-[#1f1f1f]">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-sans font-bold text-white">The Middle East ↔ India Venture Corridor</h4>
                  <p className="text-xs text-zinc-400 mt-1">Designing organic pipelines to streamline product validation, local licensing routing, and funding eligibility across emerging ecosystems.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start p-3 hover:bg-zinc-950 rounded-xl transition border border-transparent hover:border-[#1f1f1f]">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-sans font-bold text-white">1trepreneur Strategic Infrastructure</h4>
                  <p className="text-xs text-zinc-400 mt-1">Developing open-source scaling playbooks, margin audit simulators, and modular data-room standards to replace low-yield consultancy.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start p-3 hover:bg-zinc-950 rounded-xl transition border border-transparent hover:border-[#1f1f1f]">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-sans font-bold text-white">Strategic Multi-Node Commerce Logistics</h4>
                  <p className="text-xs text-zinc-400 mt-1">Assisting cross-border brands to audit and construct cold-chain structures, preventing inventory leaks and last-mile SLA degradation.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start p-3 hover:bg-zinc-950 rounded-xl transition border border-transparent hover:border-[#1f1f1f]">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-sans font-bold text-white">Elite Founder Gatherings & Roundtables</h4>
                  <p className="text-xs text-zinc-400 mt-1">Curating invite-only, high-density summits connecting operators directly with institutional heads and capital syndicates.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Signature Services Grid */}
        <section className="space-y-8">
          <div id="services-header" className="scroll-mt-24 text-center">
            <span className="px-3 py-1 bg-[#0d0d0d] border border-[#1f1f1f] text-amber-500 rounded-full text-xs font-mono font-medium uppercase tracking-wider">
              Venture Pipelines
            </span>
            <h2 className="text-3xl font-sans font-bold text-white mt-2">Strategic Access Pathways</h2>
            <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-2xl mx-auto">
              Unlock cross-border launchpads, institutional narrative architecture, and audited commerce infrastructure designed for sovereign startup operators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <div 
                key={idx}
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
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const cleanAnchor = svc.anchor.split(' ')[0];
                    if (cleanAnchor === "deck-section") {
                      handleNavToTab("grader");
                    } else if (cleanAnchor === "calculator-section") {
                      handleNavToTab("calculator");
                    } else {
                      handleSmoothScroll(cleanAnchor);
                    }
                  }}
                  className="w-full py-2.5 border border-[#1f1f1f] group-hover:border-amber-500/20 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
                >
                  <span>{svc.actionLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Central Interactive Portal Workspace Panel */}
        <section id="workspace-hub" className="scroll-mt-24 space-y-6">
          <div className="bg-[#0d0d0d] rounded-3xl border border-[#1f1f1f] shadow-sm p-4 md:p-6 space-y-6 animate-none">
            {/* Tabs selector */}
            <div className="flex bg-black/40 border border-[#1f1f1f] p-1.5 rounded-2xl overflow-x-auto scrollbar-none gap-1">
              <button
                onClick={() => setActiveTab("chat")}
                id="tab-select-chat"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-sans font-semibold cursor-pointer transition-all duration-250 flex-1 justify-center md:flex-initial ${
                  activeTab === "chat"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/10 font-bold scale-[1.01]"
                    : "hover:bg-zinc-900 border border-transparent text-zinc-400"
                }`}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span>01. Corridor Dialogue</span>
              </button>

              <button
                onClick={() => setActiveTab("grader")}
                id="tab-select-grader"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-sans font-semibold cursor-pointer transition-all duration-250 flex-1 justify-center md:flex-initial ${
                  activeTab === "grader"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/10 font-bold scale-[1.01]"
                    : "hover:bg-zinc-900 border border-transparent text-zinc-400"
                }`}
              >
                <FileCheck2 className="w-4 h-4 flex-shrink-0" />
                <span>02. Narrative Grader</span>
              </button>

              <button
                onClick={() => setActiveTab("calculator")}
                id="tab-select-calculator"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-sans font-semibold cursor-pointer transition-all duration-250 flex-1 justify-center md:flex-initial ${
                  activeTab === "calculator"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/10 font-bold scale-[1.01]"
                    : "hover:bg-[#121212] border border-transparent text-zinc-400"
                }`}
              >
                <Calculator className="w-4 h-4 flex-shrink-0" />
                <span>03. Infrastructure Analytics</span>
              </button>

              <button
                onClick={() => setActiveTab("growth")}
                id="tab-select-growth"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-sans font-semibold cursor-pointer transition-all duration-250 flex-1 justify-center md:flex-initial ${
                  activeTab === "growth"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/10 font-bold scale-[1.01]"
                    : "hover:bg-zinc-900 border border-transparent text-zinc-400"
                }`}
              >
                <TrendingUp className="w-4 h-4 flex-shrink-0" />
                <span>04. Growth & Leads</span>
              </button>
            </div>

            {/* Render selected workspace frame with animations */}
            <div className="min-h-[450px]">
              <AnimatePresence mode="wait">
                {activeTab === "chat" && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ClarityAssistant />
                  </motion.div>
                )}

                {activeTab === "grader" && (
                  <motion.div
                    key="grader"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PitchGrader />
                  </motion.div>
                )}

                {activeTab === "calculator" && (
                  <motion.div
                    key="calculator"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <EcomAuditCalculator />
                  </motion.div>
                )}

                {activeTab === "growth" && (
                  <motion.div
                    key="growth"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GrowthMarketingHub />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 6. Active Scheduler Form */}
        <section>
          <BookingForm />
        </section>

      </main>

      {/* 7. Footer element */}
      <footer className="bg-[#0c0c0c] text-zinc-400 border-t border-[#1f1f1f] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8 pb-8 border-b border-[#1f1f1f]">
            {/* Left section signature */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                <span className="w-6 h-6 bg-amber-500 text-black flex items-center justify-center rounded text-xs font-bold">JM</span>
                <span>Jimmy Manalel</span>
              </div>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-sm">
                Connecting founders, capital, and market expansion pathways across regional startup gateways and bilateral venture corridors.
              </p>
            </div>

            {/* Mid sections contact */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider">
                Direct Communication
              </h4>
              <div className="space-y-2 text-xs md:text-sm text-zinc-400">
                <div className="flex items-center gap-2 hover:text-white transition">
                  <Mail className="w-4 h-4 text-amber-550 flex-shrink-0" />
                  <a href="mailto:jimmymanalel@gmail.com" className="hover:text-amber-500 transition">jimmymanalel@gmail.com</a>
                </div>
                <div className="flex items-center gap-2 hover:text-white transition">
                  <Linkedin className="w-4 h-4 text-amber-550 flex-shrink-0" />
                  <a href="https://linkedin.com/in/planterjimmy" target="_blank" rel="noreferrer" className="hover:text-amber-500 transition">LinkedIn: planterjimmy</a>
                </div>
              </div>
            </div>

            {/* Right section philosophy quote */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider">
                Our Philosophy
              </h4>
              <p className="text-zinc-500 italic text-xs leading-relaxed">
                "Startups fail because of unclear thinking, weak execution, poor storytelling, lack of resilience, and founders not knowing what game they are really playing."
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 font-mono space-y-3 md:space-y-0">
            <div>
              © 2026 Jimmy Manalel. All Rights Reserved.
            </div>
            <div className="flex gap-4">
              <span>Backed by 500 Global Experience</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
