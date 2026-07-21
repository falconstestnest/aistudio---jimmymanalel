/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Milestone, Award, Users, AlertCircle } from "lucide-react";
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

/**
 * Interactive operator timeline. Page-level headings (Operator Track Record / My Journey)
 * live on the parent so there is only one visible “My Journey” H2.
 */
export default function AboutTimeline() {
  const events: TimelineEvent[] = [
    {
      year: "Before 2015",
      title: "The Banking Roots",
      subtitle: "Corporate Finance & Asset Management",
      icon: <Briefcase className="w-5 h-5" />,
      category: "banking",
      context:
        "I started my professional journey inside banking, managing client assets and understanding corporate finance mechanisms. It was comfortable, highly structured, and secure. But I realized I wanted to build and experience the operational struggle of growth first-hand.",
      textbookVsReality: {
        textbook:
          "Corporate models teach you that markets are predictable spreadsheets with set variables.",
        reality:
          "In real business, spreadsheets survive exactly until you launch. Cash-flow timing matters infinitely more than standard accounting accruals.",
      },
      keyTakeaway:
        "A foundation in finance prevents naive scaling, but execution is what produces actual survival.",
    },
    {
      year: "2015–2018",
      title: "Building the UAE’s Online Greenery Brand",
      subtitle: "Co-founded Plantshop.ae",
      icon: <Milestone className="w-5 h-5" />,
      category: "startup",
      context:
        "In 2015, Jimmy co-founded Plantshop.ae and helped pioneer online plant and gardening commerce in the UAE. The business grew from an empty room into a recognised platform while managing physical inventory, complex driver routing, local weather conditions, product preservation, customer acquisition and co-founder coordination.",
      textbookVsReality: {
        textbook:
          "E-commerce is a digital-marketing play—put money into advertising and watch orders grow.",
        reality:
          "E-commerce is a logistics and cash-flow sport. When delivery routing fails or products deteriorate in transit, higher advertising spend only accelerates the underlying failure.",
      },
      keyTakeaway:
        "Focus on logistics economics, fulfilment reliability and vendor relationships before scaling marketing budgets.",
    },
    {
      year: "2019–2021",
      title: "Plantshop’s 500 Global Chapter",
      subtitle: "Venture Velocity & Accelerator Growth",
      icon: <Award className="w-5 h-5" />,
      category: "vc",
      context:
        "Plantshop participated in the 500 Startups ecosystem, now 500 Global, as the business developed its operating model, investor narrative and regional ambitions.",
      textbookVsReality: {
        textbook:
          "A great pitch deck is just a compilation of nice visual templates and market forecasts.",
        reality:
          "A pitch deck is a thesis on operational speed. VCs don't buy ideas; they buy clear stories from operators who prove they are playing to win.",
      },
      keyTakeaway:
        "Keep your story simple, back it up with raw execution metrics, and know exactly what operational game you are playing.",
    },
    {
      year: "2022–Present",
      title: "Venture Corridor Builder",
      subtitle: "1trepreneur, founder mentoring & ecosystem strategy",
      icon: <Users className="w-5 h-5" />,
      category: "mentorship",
      context:
        "Today I work as a venture corridor builder across India, the GCC, and related markets. I co-founded and helped run 1trepreneur, a Dubai founder community centred on peer mentoring, meetups, and practical support—through which I have mentored more than 800 founders. I also helped create and conduct 1Tank, a pitch competition at Expand North Star in Dubai.",
      textbookVsReality: {
        textbook:
          "Advisors should give template consulting charts and high-level strategy booklets.",
        reality:
          "Founders need clear narrative, unit economics, and honest operating feedback—whether in community mentoring or focused advisory conversations.",
      },
      keyTakeaway:
        "Unclear narrative positioning and weak economic structures kill more startups than bad ideas. Mentoring scale and paid advisory are different relationships—keep them distinct.",
    },
  ];

  const [activeEventIndex, setActiveEventIndex] = useState<number>(1);

  const activeEvent = events[activeEventIndex];

  return (
    <div
      id="timeline-section"
      className="scroll-mt-24 bg-[#0d0d0d] rounded-2xl border border-[#1f1f1f] p-6 md:p-10 shadow-sm"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-none border-b lg:border-b-0 lg:border-r border-[#1f1f1f]">
          {events.map((event, index) => {
            const isActive = index === activeEventIndex;
            return (
              <button
                key={index}
                id={`timeline-btn-${index}`}
                type="button"
                onClick={() => setActiveEventIndex(index)}
                className={`flex items-center gap-4 text-left p-4 rounded-xl transition-all duration-300 whitespace-nowrap lg:whitespace-normal cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${
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
                  <div className="text-xs font-mono font-bold opacity-70">{event.year}</div>
                  <div className="font-sans font-semibold text-sm md:text-base mt-0.5">
                    {event.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

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
                  <span className="text-amber-500 font-semibold">{activeEvent.subtitle}</span>
                </div>
                <h3 className="text-2xl font-sans font-bold text-white mb-4">{activeEvent.title}</h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
                  {activeEvent.context}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#121212] p-4 rounded-xl border border-[#1f1f1f] relative overflow-hidden">
                    <div className="absolute top-0 right-0 py-0.5 px-2 bg-zinc-900 text-zinc-500 text-[10px] uppercase font-mono tracking-wider rounded-bl border-l border-b border-[#1f1f1f]">
                      What the Textbooks Say
                    </div>
                    <div className="text-xs text-red-400 font-mono font-bold mb-1 mt-4 md:mt-0">
                      MOCK SETUP
                    </div>
                    <p className="text-zinc-400 text-xs md:text-sm italic">
                      &ldquo;{activeEvent.textbookVsReality.textbook}&rdquo;
                    </p>
                  </div>

                  <div className="bg-[#050505] text-white p-4 rounded-xl relative overflow-hidden border border-amber-500/10">
                    <div className="absolute top-0 right-0 py-0.5 px-2 bg-zinc-900 text-amber-500 text-[10px] uppercase font-mono tracking-wider rounded-bl border-l border-b border-[#1f1f1f]">
                      Execution Reality
                    </div>
                    <div className="text-xs text-amber-500 font-mono font-bold mb-1 mt-4 md:mt-0">
                      REAL LESSON
                    </div>
                    <p className="text-zinc-300 text-xs md:text-sm font-medium">
                      &ldquo;{activeEvent.textbookVsReality.reality}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-amber-500/10 pt-4 flex gap-3 items-start bg-amber-500/5 p-4 rounded-xl">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                    Jimmy&rsquo;s Signature Takeaway
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
