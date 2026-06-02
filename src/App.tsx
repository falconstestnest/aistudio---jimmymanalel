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

export default function App() {
  const [activeTab, setActiveTab] = useState<"chat" | "grader" | "calculator">("chat");

  const services = [
    {
      title: "Founder Strategy Session",
      desc: "Clarify your business model, positioning, and immediate tactical next steps.",
      actionLabel: "Book Strategy Session",
      badge: "One-on-One",
      anchor: "booking-section"
    },
    {
      title: "Pitch Deck Review",
      desc: "Direct assessment of your investor deck, story flow, and fundraising readiness.",
      actionLabel: "Grade Your Pitch",
      badge: "Fundraising Prep",
      anchor: "deck-section"
    },
    {
      title: "Fundraising Readiness Sprint",
      desc: "A focused, multi-week engagement to construct your investor narrative and outreach strategy.",
      actionLabel: "Apply for Sprint",
      badge: "Venture Velocity",
      anchor: "booking-section font-semibold"
    },
    {
      title: "E-commerce Growth Audit",
      desc: "A practical review of your online store, logistics economics, customer retention, and vendor loops.",
      actionLabel: "Analyze Store Metrics",
      badge: "Operational Health",
      anchor: "calculator-section"
    },
    {
      title: "Middle East Market Access",
      desc: "Guidance for founders exploring entry points in Dubai, UAE, and the wider GCC region.",
      actionLabel: "Schedule GCC Sparring",
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
                Founder • Advisor • Mentor
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <button onClick={() => handleSmoothScroll("journey-header")} className="hover:text-white transition cursor-pointer">About</button>
            <button onClick={() => handleSmoothScroll("services-header")} className="hover:text-white transition cursor-pointer">Signature Services</button>
            <button onClick={() => handleSmoothScroll("workspace-hub")} className="hover:text-white transition cursor-pointer">Clarity Hub</button>
            <button onClick={() => handleSmoothScroll("calculator-section")} className="hover:text-white transition cursor-pointer">Diagnostics</button>
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
               Global ecosystem without shrinking to only Dubai & Bangalore Ecosystem corridor
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
              I help founders turn <strong className="serif-italic text-amber-500 font-serif font-normal">unclear ideas</strong> into fundable companies, scalable systems, and powerful stories.
            </h1>
            
            <p className="text-zinc-400 font-sans text-sm md:text-base leading-relaxed max-w-3xl">
              With over 10 years of experience building UAE's early online botany leader <strong>Plantshop.ae</strong> from the ground up, obtaining venture funding backings from <strong>500 Global</strong>, and pivoting co-founders from Excel cells to actual growth metrics, I serve as a direct, battle-hardened advisor. I do not give textbook advice.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => handleSmoothScroll("workspace-hub")}
                className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl text-sm font-sans font-bold cursor-pointer inline-flex items-center gap-2 group transition"
                id="hero-launch-bot"
              >
                <span>Launch Clarity Workspace</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={() => handleSmoothScroll("calculator-section")}
                className="px-6 py-3 border border-[#1f1f1f] hover:bg-zinc-900 text-zinc-350 hover:text-white rounded-xl text-sm font-sans font-semibold cursor-pointer transition"
                id="hero-operations-calc"
              >
                Run Store Diagnostic
              </button>
            </div>
          </div>

          {/* Right Visual Bento Box */}
          <div className="lg:col-span-4 p-6 bg-[#090909] rounded-2xl border border-[#1f1f1f] flex flex-col justify-between h-72">
            <div className="space-y-4">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold">
                Proven Track Record
              </div>
              <div className="space-y-3">
                <div className="flex gap-2.5 items-start">
                  <Award className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-zinc-300 font-medium">Plantshop.ae Co-founder (500 Global backed)</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Users className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-zinc-300 font-medium">Mentor to 80+ early-stage technology founders</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <TrendingUp className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-zinc-300 font-medium">Active Founder of 1trepreneur community</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#1f1f1f]/60 pt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block uppercase">LOCATION CORE:</span>
                <span className="text-xs font-sans font-bold text-zinc-300">Dubai, UAE & India</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse border-2 border-[#090909] shadow-sm" />
            </div>
          </div>
        </section>

        {/* 3. About & Interactive Timeline */}
        <section className="space-y-6">
          <div id="journey-header" className="scroll-mt-24 text-center">
            <h3 className="text-sm font-mono text-zinc-500 font-bold uppercase tracking-wider">The Combat Record</h3>
            <h2 className="text-3xl font-display font-semibold text-white mt-1">My Journey</h2>
          </div>
          <AboutTimeline />
        </section>

        {/* 4. Signature Services Grid */}
        <section className="space-y-8">
          <div id="services-header" className="scroll-mt-24 text-center">
            <span className="px-3 py-1 bg-[#0d0d0d] border border-[#1f1f1f] text-amber-500 rounded-full text-xs font-mono font-medium uppercase tracking-wider">
              Engagement Methods
            </span>
            <h2 className="text-3xl font-sans font-bold text-white mt-2">Signature Services</h2>
            <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
              How we can work together to bring storytelling precision, economic feasibility, and Middle East ecosystem pathways to your startup venture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <div 
                key={idx}
                className="bg-[#0d0d0d] border border-[#1f1f1f] p-6 md:p-8 rounded-2xl shadow-sm hover:border-amber-500/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                      SERVICE 0{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded text-[10px] font-mono">
                      {svc.badge}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-lg md:text-xl text-white mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const cleanAnchor = svc.anchor.split(' ')[0];
                    handleSmoothScroll(cleanAnchor);
                  }}
                  className="w-full py-2.5 border border-[#1f1f1f] hover:bg-zinc-900 text-zinc-355 hover:text-white rounded-xl text-xs sm:text-sm font-sans font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
                >
                  <span>{svc.actionLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Central Interactive Portal Workspace Panel */}
        <section id="workspace-hub" className="scroll-mt-24 space-y-6">
          <div className="bg-[#0d0d0d] rounded-3xl border border-[#1f1f1f] shadow-sm p-4 md:p-6 space-y-6">
            {/* Tabs selector */}
            <div className="flex border-b border-[#1f1f1f] pb-3 overflow-x-auto scrollbar-none gap-2">
              <button
                onClick={() => setActiveTab("chat")}
                id="tab-select-chat"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-sans font-semibold cursor-pointer transition ${
                  activeTab === "chat"
                    ? "bg-amber-500 text-black shadow-sm"
                    : "hover:bg-zinc-950 border border-[#1f1f1f] text-zinc-400"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>01. Dialogue & Sparring Bot</span>
              </button>

              <button
                onClick={() => setActiveTab("grader")}
                id="tab-select-grader"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-sans font-semibold cursor-pointer transition ${
                  activeTab === "grader"
                    ? "bg-amber-500 text-black shadow-sm"
                    : "hover:bg-zinc-950 border border-[#1f1f1f] text-zinc-400"
                }`}
              >
                <FileCheck2 className="w-4 h-4" />
                <span>02. Startup Deck Grader</span>
              </button>

              <button
                onClick={() => setActiveTab("calculator")}
                id="tab-select-calculator"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-sans font-semibold cursor-pointer transition ${
                  activeTab === "calculator"
                    ? "bg-amber-500 text-black shadow-sm"
                    : "hover:bg-zinc-955 border border-[#1f1f1f] text-zinc-400"
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>03. Store Economics Diagnostics</span>
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
                I help founders turn unclear ideas into fundable companies, scalable systems, and powerful stories. UAE / India ecosystem pathway.
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
