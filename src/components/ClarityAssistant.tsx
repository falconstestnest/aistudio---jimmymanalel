/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, MessageCircle, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { ChatMessage } from "../types";

// Dynamic Minimalist Markdown Parser to preserve beautiful typography
export function AdvisoryMarkdown({ text }: { text: string }) {
  if (!text) return null;
  
  const lines = text.split("\n");
  
  return (
    <div className="space-y-3 font-sans text-sm md:text-base leading-relaxed text-zinc-300">
      {lines.map((line, idx) => {
        // Headers
        if (line.startsWith("### ")) {
          return (
            <h3 key={idx} className="text-base md:text-lg font-bold text-white pt-2 pb-1 border-b border-[#1f1f1f] font-sans tracking-tight">
              {line.replace("### ", "")}
            </h3>
          );
        }
        if (line.startsWith("## ")) {
          const content = line.replace("## ", "");
          return (
            <h2 key={idx} className="text-lg md:text-xl font-bold text-white pt-3 pb-1 font-sans tracking-tight">
              {content}
            </h2>
          );
        }
        
        // Bullet Points
        if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
          const cleanLine = line.replace(/^[-\*]\s+/, "");
          return (
            <li key={idx} className="ml-5 list-disc pl-1 text-zinc-300">
              {renderInlineBold(cleanLine)}
            </li>
          );
        }
        
        // Numbered lists
        if (/^\d+\.\s+/.test(line.trim())) {
          return (
            <div key={idx} className="ml-2 pl-3 border-l-2 border-amber-500 py-1 font-medium text-zinc-200">
              {renderInlineBold(line)}
            </div>
          );
        }

        // Default paragraph
        if (line.trim() === "") return <div key={idx} className="h-2" />;
        
        return <p key={idx} className="text-zinc-300">{renderInlineBold(line)}</p>;
      })}
    </div>
  );
}

// Render dynamic bold elements **text** with custom amber styling
function renderInlineBold(text: string) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          return <strong key={index} className="font-extrabold text-[#fff] underline decoration-amber-500/40 decoration-wavy">{part}</strong>;
        }
        return part;
      })}
    </>
  );
}

export default function ClarityAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "### Welcome to the Founder Clarity Workspace\n\nI built Plantshop.ae from scratch and backed it up with 500 Global accelerator lessons. I work with founders who are serious about narrative grit and logistics survival.\n\nTell me, **where are you stuck right now?** Is it co-founder alignments, fundraising stories, or marketplace logistics bleed?\n\nLet's cut the noise and map your next move.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starterPrompts = [
    {
      label: "Validate my marketplace idea",
      prompt: "I want to build a localized high-margin marketplace. What are Jimmy's three crucial rules for first-mile coordination and logistics control?"
    },
    {
      label: "Co-founder equity divisions",
      prompt: "We are dividing equity between 3 cofounders. We are having arguments on technical vs sales contributions. What's Jimmy's direct advice?"
    },
    {
      label: "Pitch deck narrative trap",
      prompt: "What is the single biggest narrative trap founders fall into when writing their problem statement for VCs in Dubai / UAE?"
    },
    {
      label: "E-commerce scale-up loop",
      prompt: "We want to scale our orders from 10 to 100/day. Logistics SLA is breaking down. How do we triage operations?"
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setErrorStatus(null);
    const userMsgId = `usr-${Date.now()}`;
    const newUserMessage: ChatMessage = {
      id: userMsgId,
      role: "user",
      text: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map chat history structure excluding the welcome message for clarity API
      const apiHistory = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role,
          text: m.text
        }));

      const response = await fetch("/api/clarity", {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           message: text,
           chatHistory: apiHistory
         })
      });

      if (!response.ok) {
        throw new Error("Advisory logic pipeline returned non-200 state");
      }

      const data = await response.json();
      
      const modelMsgId = `mod-${Date.now()}`;
      const newModelMessage: ChatMessage = {
        id: modelMsgId,
        role: "model",
        text: data.text || "Jimmy suggests gathering more focus parameters. Let's describe your core transaction cycle.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, newModelMessage]);
    } catch (error) {
      console.error("Clarity Assistant API failure:", error);
      setErrorStatus("Connection timeout. I will respond using Jimmy's default offline mentorship engine.");
      
      // Fallback response simulation
      setTimeout(() => {
        const modelMsgId = `mod-offline-${Date.now()}`;
        let fallbackBody = "### Advisor Offline Take\n\nExecution speed is what counts. Here's my core advisory for this question:\n- **No Textbook Clutter**: Be direct about how you earn money.\n- **Action over Talk**: Focus on physical interactions and transaction proof before fundraising.\n\nLet's keep drilling into your metrics.";
        
        if (text.toLowerCase().includes("pitch") || text.toLowerCase().includes("equity")) {
          fallbackBody = "### Feedback on Equity & Narrative\n\nKeep equity conversations based on future execution, not legacy ideas. Allocate shares over a 4-year vesting schedule with a 1-year cliff. Let's make sure you aren't over-indexing on conceptual blueprints.\n\nSpeak sharply, move decisively.";
        }
        
        const offlineMessage: ChatMessage = {
          id: modelMsgId,
          role: "model",
          text: fallbackBody,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, offlineMessage]);
         setIsLoading(false);
      }, 1000);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="clarity-section" className="scroll-mt-24 bg-[#0d0d0d] text-zinc-100 rounded-2xl border border-[#1f1f1f] p-6 md:p-8 shadow-xl flex flex-col h-[650px] relative overflow-hidden">
      
      {/* Absolute ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header element */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1f1f1f] pb-5 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#050505] border border-[#1f1f1f] flex items-center justify-center relative shadow-inner">
            <span className="font-mono text-amber-500 font-bold">JM</span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-full border border-[#0d0d0d]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-sans font-bold text-base md:text-lg text-white">
                Cofounder Clarity Assistant
              </h3>
              <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase font-semibold">
                ACTIVE
              </span>
            </div>
            <p className="text-zinc-400 text-xs md:text-sm mt-0.5">
              Instant practical coaching from co-founder of Plantshop.ae and 500 Global alumnus
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-zinc-500 font-mono text-xs">
          <MessageCircle className="w-4 h-4 text-amber-550" />
          <span>Interactive Sparring Partner</span>
        </div>
      </div>

      {/* Messages Sandbox container */}
      <div className="flex-1 overflow-y-auto mt-6 pr-2 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent z-10">
        {messages.map((message) => {
          const isModel = message.role === "model";
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: isModel ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${isModel ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 border shadow-sm ${
                  isModel
                    ? "bg-[#090909] border-[#1f1f1f] text-zinc-200 rounded-tl-none p-5"
                    : "bg-amber-500 border-amber-400 text-black rounded-tr-none font-semibold shadow-md shadow-amber-500/5"
                }`}
              >
                {isModel ? (
                  <AdvisoryMarkdown text={message.text} />
                ) : (
                  <p className="whitespace-pre-line text-sm md:text-base leading-relaxed">{message.text}</p>
                )}
                <div className={`mt-2 text-[10px] font-mono text-right ${isModel ? "text-zinc-600" : "text-amber-950 font-normal"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#090909] border border-[#1f1f1f] rounded-2xl rounded-tl-none p-4 max-w-[150px] flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce" />
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        {errorStatus && (
          <div className="bg-red-500/10 border border-red-500/25 p-3 rounded-lg flex items-center gap-2 text-xs text-red-400 font-mono">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{errorStatus}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Topics */}
      {messages.length === 1 && (
        <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-3 z-10">
          {starterPrompts.map((topic, i) => (
            <button
              key={i}
              id={`starter-btn-${i}`}
              onClick={() => handleSendMessage(topic.prompt)}
              className="flex items-center justify-between text-left p-3 rounded-xl border border-[#1f1f1f] bg-[#050505]/50 hover:bg-zinc-900 hover:border-zinc-700 text-xs md:text-sm text-zinc-300 hover:text-white transition-all cursor-pointer group"
            >
              <div className="flex font-medium pr-2">
                <span className="text-amber-550 font-bold mr-2 text-xs">0{i+1}.</span>
                <span>{topic.label}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="mt-4 flex gap-2 border-t border-[#1f1f1f] pt-4 z-10 bg-[#0d0d0d]"
      >
        <input
          type="text"
          id="clarity-chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about marketplace logistics, Dubai expansion, or VC pitches..."
          className="flex-1 bg-[#050505] border border-[#1f1f1f] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
        />
        <button
          type="submit"
          id="clarity-chat-submit"
          disabled={!inputValue.trim() || isLoading}
          className="bg-amber-500 hover:bg-amber-400 font-sans font-bold text-black px-4 py-3 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:hover:bg-amber-500 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

