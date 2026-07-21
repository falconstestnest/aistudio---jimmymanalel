import React from "react";

/**
 * Lightweight SVG Signal Atlas — decorative geographic movement.
 * Enlarged visual centrepiece for the homepage hero.
 * Labels also listed in HTML for a11y and crawlability.
 * Nodes do not imply offices or local operations.
 */
export default function CorridorAtlas({
  size = "compact",
}: {
  /** hero = homepage centrepiece; compact = secondary pages */
  size?: "hero" | "compact";
} = {}) {
  // Spread nodes for readability at larger canvas
  const nodes = [
    { id: "sin", label: "Singapore", x: 82, y: 78 },
    { id: "kul", label: "Kuala Lumpur", x: 74, y: 72 },
    { id: "bkk", label: "Bangkok", x: 71, y: 58 },
    { id: "sel", label: "Seoul", x: 90, y: 26 },
    { id: "ind", label: "India", x: 50, y: 50 },
    { id: "dxb", label: "Dubai", x: 24, y: 48 },
    { id: "auh", label: "Abu Dhabi", x: 22, y: 56 },
    { id: "ruh", label: "Riyadh", x: 16, y: 40 },
  ];

  const arcs = [
    "M82,78 L50,50 L24,48",
    "M74,72 L50,50 L22,56",
    "M71,58 L50,50 L24,48",
    "M90,26 L50,50 L16,40",
    "M50,50 L24,48",
  ];

  const isHero = size === "hero";
  const frameClass = isHero
    ? "relative min-h-[280px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[440px] rounded-2xl md:rounded-3xl border border-[#1f1f1f]/80 bg-gradient-to-br from-[#0a0c12] via-[#090909] to-[#0d0d0d] overflow-hidden"
    : "relative min-h-[220px] md:min-h-[280px] rounded-2xl border border-[#1f1f1f] bg-gradient-to-br from-[#0a0c12] via-[#090909] to-[#0d0d0d] overflow-hidden";
  const svgClass = isHero
    ? "w-full h-[280px] sm:h-[320px] md:h-[400px] lg:h-[440px]"
    : "w-full h-[220px] md:h-[280px]";

  return (
    <figure className="w-full" aria-labelledby="atlas-caption">
      <div className={frameClass}>
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            background:
              "radial-gradient(ellipse at 72% 48%, rgba(30,58,95,0.4), transparent 55%), radial-gradient(ellipse at 22% 48%, rgba(245,158,11,0.1), transparent 50%)",
          }}
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 100 100"
          className={svgClass}
          role="img"
          aria-label="Illustrative strategic corridor map across Asia, India and the GCC"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="arcGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          {arcs.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="url(#arcGold)"
              strokeWidth={isHero ? "0.4" : "0.35"}
              className="corridor-arc"
              strokeLinecap="round"
            />
          ))}
          {nodes.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={isHero ? "2.2" : "1.8"}
                className="corridor-node-ring"
                fill="none"
                stroke="#f59e0b"
                strokeOpacity="0.35"
                strokeWidth="0.3"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={isHero ? "1.15" : "0.9"}
                fill="#f59e0b"
                className="corridor-node"
              />
              <text
                x={n.x}
                y={n.y - (isHero ? 3.6 : 2.8)}
                textAnchor="middle"
                fill="#c4c4cc"
                fontSize={isHero ? "3.1" : "2.4"}
                fontFamily="JetBrains Mono, monospace"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption
        id="atlas-caption"
        className="mt-2.5 text-[10px] md:text-[11px] font-mono text-zinc-600 leading-relaxed max-w-2xl"
      >
        Illustrative strategic corridor nodes—not office locations.
      </figcaption>
      <ul className="sr-only">
        {nodes.map((n) => (
          <li key={n.id}>{n.label}</li>
        ))}
      </ul>
    </figure>
  );
}
