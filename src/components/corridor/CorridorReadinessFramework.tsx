import React, { useId, useState } from "react";

const DIMENSIONS = [
  {
    id: "relevance",
    label: "Market Relevance",
    detail:
      "Whether the product solves a real, paid problem for a defined customer in the destination market—not only a large TAM slide.",
  },
  {
    id: "narrative",
    label: "Founder and Narrative Readiness",
    detail:
      "Whether the founding team can explain the thesis, evidence, risks and ask without contradiction under scrutiny.",
  },
  {
    id: "distribution",
    label: "Distribution and Partnerships",
    detail:
      "How the product reaches customers: channels, partners, incentives, and who owns the relationship.",
  },
  {
    id: "economics",
    label: "Operating Economics",
    detail:
      "Unit economics after product cost, delivery, acquisition and inventory risk—and whether growth compounds or burns cash.",
  },
  {
    id: "execution",
    label: "Cross-Border Execution",
    detail:
      "Capacity to run a second market: operating systems, team load, sequencing, and honest milestones.",
  },
] as const;

/** Pentagon vertices for 5 dimensions in a 100x100 viewBox */
const VERTICES = [
  { x: 50, y: 12 },
  { x: 88, y: 38 },
  { x: 74, y: 82 },
  { x: 26, y: 82 },
  { x: 12, y: 38 },
];

/**
 * Interactive explanatory framework — not a scored diagnostic.
 */
export default function CorridorReadinessFramework() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const poly = VERTICES.map((v) => `${v.x},${v.y}`).join(" ");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="rounded-2xl border border-[#1f1f1f] bg-[#090909] p-4 md:p-6">
        <svg
          viewBox="0 0 100 100"
          className="w-full max-w-md mx-auto h-auto"
          role="img"
          aria-label="Corridor Readiness Framework pentagon with five dimensions"
        >
          <polygon
            points={poly}
            fill="rgba(245,158,11,0.04)"
            stroke="rgba(245,158,11,0.35)"
            strokeWidth="0.5"
          />
          {VERTICES.map((v, i) => {
            const selected = i === active;
            return (
              <g key={DIMENSIONS[i].id}>
                <circle
                  cx={v.x}
                  cy={v.y}
                  r={selected ? 3.2 : 2.4}
                  fill={selected ? "#f59e0b" : "#18181b"}
                  stroke={selected ? "#fbbf24" : "#38bdf8"}
                  strokeWidth="0.5"
                  className="cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-pressed={selected}
                  aria-controls={`${baseId}-panel`}
                  aria-label={DIMENSIONS[i].label}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                />
                <text
                  x={v.x}
                  y={v.y + (i === 0 ? -5 : i >= 2 && i <= 3 ? 7 : 0)}
                  textAnchor="middle"
                  fill={selected ? "#fafafa" : "#71717a"}
                  fontSize="2.6"
                  fontFamily="JetBrains Mono, monospace"
                  className="pointer-events-none"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
        <p
          id={`${baseId}-panel`}
          className="mt-4 rounded-xl border border-[#1f1f1f] bg-[#0d0d0d] p-4"
          aria-live="polite"
        >
          <span className="text-xs font-mono uppercase tracking-wider text-amber-500">
            {active + 1}. {DIMENSIONS[active].label}
          </span>
          <span className="mt-2 block text-sm text-zinc-400 leading-relaxed">
            {DIMENSIONS[active].detail}
          </span>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-sans font-bold text-white">
          The Corridor Readiness Framework
        </h3>
        <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
          Five dimensions used to evaluate whether a venture can move across markets. This is an
          explanatory system—not a scored diagnostic, credit rating or investment score.
        </p>
        <ol className="mt-5 space-y-3">
          {DIMENSIONS.map((d, i) => (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`w-full text-left rounded-xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${
                  i === active
                    ? "border-amber-500/40 bg-amber-500/5"
                    : "border-[#1f1f1f] bg-[#0b0b0b] hover:border-[#2a2a2a]"
                }`}
              >
                <span className="text-[10px] font-mono text-zinc-600">0{i + 1}</span>
                <span className="ml-2 text-sm font-semibold text-white">{d.label}</span>
                <span className="mt-1 block text-xs text-zinc-500 leading-relaxed">{d.detail}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
