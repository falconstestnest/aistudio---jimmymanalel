/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileWarning, CheckCircle, BarChart3, TrendingUp, AlertTriangle, RefreshCw, Layers, ShieldCheck, Zap } from "lucide-react";
import { PitchInput, PitchGradeResult } from "../types";

export default function PitchGrader() {
  const [inputs, setInputs] = useState<PitchInput>({
    name: "",
    pitch: "",
    targetUser: "",
    businessModel: "",
    gccOpportunity: "interested",
    currentTraction: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PitchGradeResult | null>(null);
  const [prevGrade, setPrevGrade] = useState<PitchGradeResult | null>(null);

  // Auto-load previous deck grading if exists
  useEffect(() => {
    const cached = localStorage.getItem("jimmy_pitch_grade");
    if (cached) {
      try {
        setResult(JSON.parse(cached));
      } catch (e) {
        console.error("Failed to parse cached grade", e);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePitchGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.pitch.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/pitch-grader", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
      });

      if (!response.ok) {
        throw new Error("Advisory grader endpoint returned non-200 state");
      }

      const data: PitchGradeResult = await response.json();
      setResult(data);
      localStorage.setItem("jimmy_pitch_grade", JSON.stringify(data));
      localStorage.setItem("jimmy_pitch_inputs", JSON.stringify(inputs));
    } catch (error) {
      console.error("Failed to fetch pitch grading:", error);
      
      // Smart Fallback offline assessment Engine matching Jimmy's real background
      const getLetter = (ptch: string) => {
        if (ptch.length > 150) return "B+";
        if (ptch.length > 80) return "C+";
        return "D";
      };

      const fallback: PitchGradeResult = {
        overallScore: inputs.pitch.length > 150 ? 76 : 64,
        storytellingGrade: getLetter(inputs.pitch),
        executionGrade: inputs.businessModel.length > 50 ? "B" : "C",
        marketFitGrade: "B-",
        summary: `Jimmy's Offline Assessment for "${inputs.name || 'Your Startup'}": You are clearly early in your conceptual process. There is a potential product alignment, but you need to narrow down on a single, high-margin transaction cycle rather than presenting broad industry solutions.`,
        constructiveCritiques: [
          "Your customer acquisition model is glossed over. You need to prove how you can reach them without relying purely on paid marketing.",
          "Monetization routes are too broad. Focus on a single checkout loop before introducing complex multi-tier subscriptions.",
          "Operational delivery models lack clear logistics structure (critical if building a transactional marketplace)."
        ],
        actionableSteps: [
          "Rewrite your elevator pitch in 1 line: 'We help [Target User] accomplish [Core Benefit] through [Mechanism]'.",
          "Conduct 10 manual customer interviews in the next 14 days to validate that they actually suffer from this bottleneck.",
          "If exploring the GCC, formulate your local entry strategy with relationship builders, rather than broad corporate mail campaigns."
        ],
        middleEastAdvisory: "UAE customer acquisition cost is highly competitive. For high-density localized models, design basket sizes above 150 AED or focus on corporate B2B integrations."
      };

      setTimeout(() => {
        setResult(fallback);
        localStorage.setItem("jimmy_pitch_grade", JSON.stringify(fallback));
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPrevGrade(result);
    setResult(null);
    localStorage.removeItem("jimmy_pitch_grade");
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return { border: "border-emerald-500", text: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (score >= 70) return { border: "border-amber-500", text: "text-amber-500", bg: "bg-amber-500/10" };
    return { border: "border-rose-500", text: "text-rose-500", bg: "bg-rose-500/10" };
  };

  return (
    <div id="deck-section" className="scroll-mt-24 bg-[#0d0d0d] rounded-2xl border border-[#1f1f1f] p-6 md:p-10 shadow-sm">
      <div className="mb-6">
        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-xs font-mono font-semibold tracking-wider uppercase">
          Readiness Review
        </span>
        <h2 className="text-3xl font-sans font-bold tracking-tight text-white mt-2">
          Pitch Story & VC <span className="serif-italic text-amber-500">Readiness Grader</span>
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Submit your concept block. Our advisory algorithm grades your core narrative, business logic, and operational readiness, delivering direct feedback based on Jimmy's real-world investor experience.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!result && !isLoading ? (
          <motion.form
            onSubmit={handlePitchGradeSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
            id="pitch-grader-form"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-355 mb-1.5" htmlFor="startup-name">
                    Startup or Project Name
                  </label>
                  <input
                    type="text"
                    id="startup-name"
                    name="name"
                    placeholder="e.g., Plantshop Ecosystems, GreenRoute Care"
                    value={inputs.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-zinc-950 transition-all placeholder-zinc-650"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-355 mb-1.5" htmlFor="startup-pitch">
                    Elevator Pitch / The Hook *
                  </label>
                  <textarea
                    id="startup-pitch"
                    name="pitch"
                    required
                    rows={3}
                    placeholder="Describe your startup. What is the fundamental hook, mechanism, and customer relief?"
                    value={inputs.pitch}
                    onChange={handleInputChange}
                    className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-zinc-950 transition-all resize-none placeholder-zinc-650"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-355 mb-1.5" htmlFor="startup-traction">
                    Current Traction / Progress Metrics
                  </label>
                  <input
                    type="text"
                    id="startup-traction"
                    name="currentTraction"
                    placeholder="e.g., Pre-revenue wireframe, 15 manual pilot orders, $5k MRR"
                    value={inputs.currentTraction}
                    onChange={handleInputChange}
                    className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-zinc-950 transition-all placeholder-zinc-655"
                  />
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-355 mb-1.5" htmlFor="startup-target">
                    Target Users & The Urgent Problem
                  </label>
                  <textarea
                    id="startup-target"
                    name="targetUser"
                    rows={2}
                    placeholder="Who loses sleep over this bottleneck? What is the current manual workaround?"
                    value={inputs.targetUser}
                    onChange={handleInputChange}
                    className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-zinc-950 transition-all resize-none placeholder-zinc-650"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-355 mb-1.5" htmlFor="startup-model">
                    Business Model / How You Earn Cash flow
                  </label>
                  <textarea
                    id="startup-model"
                    name="businessModel"
                    rows={2}
                    placeholder="Describe the cash transaction route. SaaS subscription, marketplace take-rate, transactional commission?"
                    value={inputs.businessModel}
                    onChange={handleInputChange}
                    className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-zinc-950 transition-all resize-none placeholder-zinc-650"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-355 mb-1.5" htmlFor="startup-gcc">
                    Middle East Expansion / Local Positioning
                  </label>
                  <select
                    id="startup-gcc"
                    name="gccOpportunity"
                    value={inputs.gccOpportunity}
                    onChange={handleInputChange}
                    className="w-full bg-[#050505] border border-[#1f1f1f] rounded-xl px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-zinc-950 transition-all"
                  >
                    <option value="interested" className="bg-[#0c0c0c] text-white">Currently based in UAE/Gulf or actively planning launch</option>
                    <option value="exploring" className="bg-[#0c0c0c] text-white">India/emerging market exploring market expansion corridor</option>
                    <option value="none" className="bg-[#0c0c0c] text-white">Not focused on UAE or ME markets currently</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-[#1f1f1f] pt-5 flex justify-end gap-3">
              {prevGrade && (
                <button
                  type="button"
                  id="view-prev-deck-btn"
                  onClick={() => setResult(prevGrade)}
                  className="px-5 py-3 border border-[#1f1f1f] text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl text-sm font-medium transition cursor-pointer"
                >
                  View Last Grade Report
                </button>
              )}
              <button
                type="submit"
                id="sumbit-pitch-grade"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-sm font-sans font-bold shadow-md shadow-amber-500/10 cursor-pointer transition-all animate-none"
              >
                Grade My VC Readiness
              </button>
            </div>
          </motion.form>
        ) : isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 flex flex-col items-center justify-center text-center space-y-4"
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#1f1f1f] border-t-amber-500 rounded-full animate-spin" />
              <Zap className="w-6 h-6 text-amber-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-lg text-white">Auditing Narrative Structure...</h4>
              <p className="text-zinc-550 text-sm max-w-sm mt-1 mx-auto leading-relaxed">
                Evaluating elevator hook integrity, business monetization paths, and operational feasibility parameters.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Visual Header Summary Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Block: Animated Score Ring */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#090909] rounded-2xl border border-[#1f1f1f]">
                <div className="relative flex items-center justify-center">
                  {/* Score circle */}
                  <svg className="w-36 h-36 transform -rotate-90">
                    <circle cx="72" cy="72" r="64" stroke="#161616" strokeWidth="8" fill="transparent" />
                    <circle
                      cx="72"
                      cy="72"
                      r="64"
                      stroke="#f59e0b"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={402}
                      strokeDashoffset={402 - (402 * (result?.overallScore || 0)) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-4xl font-sans font-black text-white">{result?.overallScore}</span>
                    <span className="text-zinc-500 block text-[10px] font-mono tracking-widest uppercase mt-0.5">SCORE</span>
                  </div>
                </div>

                <div className="mt-5 w-full space-y-2 border-t border-[#1f1f1f] pt-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-mono">STORY GRADE:</span>
                    <span className="text-white font-bold bg-[#050505] px-2 py-0.5 rounded border border-[#1f1f1f]">{result?.storytellingGrade}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-mono">EXECUTION FEASIBILITY:</span>
                    <span className="text-white font-bold bg-[#050505] px-2 py-0.5 rounded border border-[#1f1f1f]">{result?.executionGrade}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-mono">CUSTOMER FOCUS:</span>
                    <span className="text-white font-bold bg-[#050505] px-2 py-0.5 rounded border border-[#1f1f1f]">{result?.marketFitGrade}</span>
                  </div>
                </div>
              </div>

              {/* Right Block: Verbal appraisal summary */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-[#050505] text-zinc-100 p-6 rounded-2xl border border-amber-500/15 shadow-lg relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 py-1 px-3 bg-zinc-900 text-zinc-500 text-[10px] uppercase font-mono font-bold tracking-wider rounded-tl border-l border-t border-[#1f1f1f]">
                    Jimmy's Appraisal
                  </div>
                  <span className="text-xs text-amber-500 font-mono font-bold uppercase tracking-wider block mb-2">
                    Candid Reality Check
                  </span>
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans pr-4 italic">
                    {result?.summary}
                  </p>
                </div>

                {result?.middleEastAdvisory && (
                  <div className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-2xl flex gap-3.5 items-start">
                    <TrendingUp className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-500">Middle East Market Access Advisory</h4>
                      <p className="text-zinc-300 text-xs md:text-sm leading-relaxed mt-1">{result?.middleEastAdvisory}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Critique vs Action Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-red-400 font-bold mb-4">
                  <FileWarning className="w-5 h-5 flex-shrink-0 text-red-500" />
                  <h4 className="text-sm md:text-base font-sans font-bold">Shortcomings & Narrative Flaws</h4>
                </div>
                <ul className="space-y-3.5">
                  {result?.constructiveCritiques.map((critique, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-xs md:text-sm text-zinc-300">
                      <span className="text-red-400 font-bold text-xs mt-0.5">0{i+1}.</span>
                      <p className="leading-normal">{critique}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-4">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                  <h4 className="text-sm md:text-base font-sans font-bold">Tactical Action Steps (This Week)</h4>
                </div>
                <ul className="space-y-3.5">
                  {result?.actionableSteps.map((step, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-xs md:text-sm text-zinc-300">
                      <span className="text-emerald-400 font-mono font-bold text-xs mt-0.5">✓</span>
                      <p className="leading-normal">{step}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-[#1f1f1f] pt-6 flex justify-between items-center">
              <p className="text-xs text-zinc-500 font-mono">
                Assessed at 2026 UTC • Locked based on present specifications.
              </p>
              <button
                type="button"
                id="regrade-button"
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 border border-[#1f1f1f] hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-lg text-sm font-sans font-bold transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Adjust Parameters & Re-Grade</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
