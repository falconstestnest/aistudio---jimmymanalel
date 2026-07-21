import React from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, FileCheck2, Calculator } from "lucide-react";
import ClarityAssistant from "../ClarityAssistant";
import PitchGrader from "../PitchGrader";
import EcomAuditCalculator from "../EcomAuditCalculator";
import { motionInitial } from "../../utils/motion";
import { ROUTES, type ToolKey } from "../../lib/siteRoutes";

const TOOLS: Array<{
  key: ToolKey;
  to: string;
  id: string;
  label: string;
  icon: React.ReactNode;
}> = [
  {
    key: "dialogue",
    to: ROUTES.dialogue,
    id: "tab-select-chat",
    label: "01. Corridor Dialogue",
    icon: <MessageSquare className="w-4 h-4 flex-shrink-0" aria-hidden="true" />,
  },
  {
    key: "narrative-grader",
    to: ROUTES.narrativeGrader,
    id: "tab-select-grader",
    label: "02. Narrative Grader",
    icon: <FileCheck2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />,
  },
  {
    key: "commerce-infrastructure-audit",
    to: ROUTES.commerceAudit,
    id: "tab-select-calculator",
    label: "03. Infrastructure Analytics",
    icon: <Calculator className="w-4 h-4 flex-shrink-0" aria-hidden="true" />,
  },
];

type VentureToolsWorkspaceProps = {
  activeTool: ToolKey;
};

export default function VentureToolsWorkspace({ activeTool }: VentureToolsWorkspaceProps) {
  return (
    <div className="bg-[#0d0d0d] rounded-3xl border border-[#1f1f1f] shadow-sm p-4 md:p-6 space-y-6">
      <nav
        className="flex bg-black/40 border border-[#1f1f1f] p-1.5 rounded-2xl overflow-x-auto scrollbar-none gap-1"
        aria-label="Founder tools"
      >
        {TOOLS.map((tool) => (
          <NavLink
            key={tool.key}
            to={tool.to}
            id={tool.id}
            end={tool.key === "dialogue"}
            aria-current={activeTool === tool.key ? "page" : undefined}
            className={() =>
              `flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-sans font-semibold transition-all duration-250 flex-1 justify-center md:flex-initial focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${
                activeTool === tool.key
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/10 font-bold scale-[1.01]"
                  : "hover:bg-zinc-900 border border-transparent text-zinc-400"
              }`
            }
          >
            {tool.icon}
            <span>{tool.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="min-h-[450px]">
        <AnimatePresence mode="wait">
          {activeTool === "dialogue" && (
            <motion.div
              key="chat"
              initial={motionInitial({ opacity: 0, y: 10 })}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ClarityAssistant />
            </motion.div>
          )}

          {activeTool === "narrative-grader" && (
            <motion.div
              key="grader"
              initial={motionInitial({ opacity: 0, y: 10 })}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PitchGrader />
            </motion.div>
          )}

          {activeTool === "commerce-infrastructure-audit" && (
            <motion.div
              key="calculator"
              initial={motionInitial({ opacity: 0, y: 10 })}
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
  );
}
