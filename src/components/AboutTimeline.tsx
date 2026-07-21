/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Milestone, Award, Users, AlertCircle, Sparkles } from "lucide-react";
import { motionInitial } from "../utils/motion";

interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  category: "banking" | "startup" | "vc" | "mentorship";
  context: string;
  textbookVsReality: {
    textbook: string;
    reality: string;
  };
  keyTakeaway: string;
}

export default function AboutTimeline() {
  const events: TimelineEvent[] = [
    {
      year: "Before 2015",
      title: "The Banking Roots",
      subtitle: "Corporate Finance & Asset Management",
      icon: <Briefcase className="w-5 h-5" />,
      category: "banking",
      context: "I started my professional journey inside banking, managing client assets and understanding corporate finance mechanisms. It was comfortable, highly structured, and secure. But I realized I wanted to build and experience the operational struggle of growth first-hand.",
      textbookVsReality: {
        textbook: "Corporate models teach you that markets are predictable spreadsheets with set variables.",
        reality: "In real business, spreadsheets survive exactly until you launch. Cash-flow timing matters infinitely more than standard accounting accruals."
      },
      keyTakeaway: "A foundation in finance prevents naive scaling, but execution is what produces actual survival."
    },
    {
      year: "2015 - 2018",
      title: "Co-founded Plantshop.ae",
      subtitle: "Building UAE’s Online Greenery Brand",
      icon: <Milestone className="w-5 h-5" />,
      category: "startup",
      context: "In 2015, co-founded Plantshop.ae. We pioneered online plants and gardening in the UAE, scaling from an empty room to a leading platform. The early years meant managing physical inventory, complex driver routing, local weather conditions, product preservation, and co-founder synchronization.",
      textbookVsReality: {
        textbook: "E-commerce is a digital marketing play—just dump money in Facebook ads and watch orders flow.",
        reality: "E-commerce is a logistics and cash flow sport. If your delivery routing fails or your plants wither in transit, high ad spend just speeds up your demise."
      },
      keyTakeaway: "Focus on your logistics economics and vendor relationships before you scale your marketing budgets."
    },
    {
      year: "2019 - 2021",
      title: "VC Backing & 500 Global",
      subtitle: "Venture Velocity & Accelarator Growth",
      icon: <Award className="w-5 h-5" />,
      category: "vc",
      context: "Plantshop received backing from 500 Global, entering their accelerator. This unlocked intense scaling frameworks, direct VC fundraising scrutiny, board alignment, and expansion plays. I experienced firsthand how narrative structures can make or break a venture conversation with global investors.",
      textbookVsReality: {
        textbook: "A great pitch deck is just a compilation of nice visual templates and market forecasts.",
        reality: "A pitch deck is a thesis on operational speed. VCs don't buy ideas; they buy clear stories from operators who prove they are playing to win."
      },
      keyTakeaway: "Keep your story simple, back it up with raw execution metrics, and know exactly what operational game you are playing."
    },
    {
      year: "2022 - Present",
      title: "Venture Corridor Builder",
      subtitle: "1trepreneur Corridors & Ecosystem Strategy",
      icon: <Users className="w-5 h-5" />,
      category: "mentorship",
      context: "Today, I bridge key startup ecosystems, connecting high-intensity tech teams with cross-border capital, launch channels, and strategic positioning. I guide the 1trepreneur corridor, mobilizing active founder networks to remove structural fundraising barriers and catalyze scale-ups across global markets.",
      textbookVsReality: {
        textbook: "Advisors should give template consulting charts and high-level strategy booklets.",
        reality: "Founders need narrative gravity, absolute unit economics clarity, and real-world execution. I work as an honest strategic partner to optimize your trajectory."
      },
      keyTakeaway: "Unclear narrative positioning and weak economic structures kill more startups than bad ideas. Let's build real pipelines."
    }
  ];

  const [activeEventIndex, setActiveEventIndex] = useState<number>(1);

  const activeEvent = events[activeEventIndex];

  return (
    <div id="timeline-section" className="scroll-mt-24 bg-[#0d0d0d] rounded-2xl border border-[#1f1f1f] p-6 md:p-10 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-xs font-mono font-semibold tracking-wider uppercase">
            My Journey
          </span>
          <h2 className="text-3xl font-sans font-bold tracking-tight text-white mt-2">
            Real operator experience, not <span className="serif-italic text-amber-500">textbook blueprints</span>.
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400 bg-black/50 border border-[#1f1f1f] px-4 py-2 rounded-lg font-mono">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span> GCC, India & Global Corridors</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Dots/Line */}
        <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-none border-b lg:border-b-0 lg:border-r border-[#1f1f1f]">
          {events.map((event, index) => {
            const isActive = index === activeEventIndex;
            return (
              <button
                key={index}
                id={`timeline-btn-${index}`}
                onClick={() => setActiveEventIndex(index)}
                className={`flex items-center gap-4 text-left p-4 rounded-xl transition-all duration-300 whitespace-nowrap lg:whitespace-normal cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/10 scale-[1.02]"
                    : "hover:bg-zinc-900 hover:text-white text-zinc-400 bg-[#0d0d0d] border border-[#1f1f1f]"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    isActive ? "bg-black/20 text-black" : "bg-zinc-900 text-zinc-300"
                  }`}
                >
                  {event.icon}
                </div>
                <div>
                  <div className="text-xs font-mono font-bold opacity-70">
                    {event.year}
                  </div>
                  <div className="font-sans font-semibold text-sm md:text-base mt-0.5">
                    {event.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="lg:col-span-8 bg-[#090909] rounded-xl p-6 md:p-8 border border-[#1f1f1f] min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEventIndex}
              initial={motionInitial({ opacity: 0, y: 15 })}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                  <span>Phase {activeEventIndex + 1}</span>
                  <span>•</span>
                  <span className="text-amber-550 font-semibold">{activeEvent.subtitle}</span>
                </div>
                <h3 className="text-2xl font-sans font-bold text-white mb-4">
                  {activeEvent.title}
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
                  {activeEvent.context}
                </p>

                {/* Compare Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#121212] p-4 rounded-xl border border-[#1f1f1f] relative overflow-hidden">
                    <div className="absolute top-0 right-0 py-0.5 px-2 bg-zinc-900 text-zinc-500 text-[10px] uppercase font-mono tracking-wider rounded-bl border-l border-b border-[#1f1f1f]">
                      The Textbook Say
                    </div>
                    <div className="text-xs text-red-400 font-mono font-bold mb-1">
                      MOCK SETUP
                    </div>
                    <p className="text-zinc-450 text-xs md:text-sm italic">
                      "{activeEvent.textbookVsReality.textbook}"
                    </p>
                  </div>

                  <div className="bg-[#050505] text-white p-4 rounded-xl relative overflow-hidden border border-amber-500/10">
                    <div className="absolute top-0 right-0 py-0.5 px-2 bg-zinc-900 text-amber-500 text-[10px] uppercase font-mono tracking-wider rounded-bl border-l border-b border-[#1f1f1f]">
                      Execution Reality
                    </div>
                    <div className="text-xs text-amber-500 font-mono font-bold mb-1">
                      REAL LESSON
                    </div>
                    <p className="text-zinc-300 text-xs md:text-sm font-medium">
                      "{activeEvent.textbookVsReality.reality}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Takeaway footer */}
              <div className="border border-amber-500/10 pt-4 flex gap-3 items-start bg-amber-500/5 p-4 rounded-xl">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                    Jimmy's Signature Takeaway
                  </h4>
                  <p className="text-zinc-300 text-sm font-medium leading-normal mt-1">
                    {activeEvent.keyTakeaway}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
