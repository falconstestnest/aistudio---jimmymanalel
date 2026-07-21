import React from "react";

/**
 * Lightweight SVG Signal Atlas — decorative geographic movement.
 * Labels also listed in HTML for a11y and crawlability.
 * Nodes do not imply offices or local operations.
 */
export default function CorridorAtlas() {
  const nodes = [
    { id: "sin", label: "Singapore", x: 78, y: 72 },
    { id: "kul", label: "Kuala Lumpur", x: 72, y: 68 },
    { id: "bkk", label: "Bangkok", x: 70, y: 58 },
    { id: "sel", label: "Seoul", x: 88, y: 32 },
    { id: "ind", label: "India", x: 52, y: 52 },
    { id: "dxb", label: "Dubai", x: 28, y: 48 },
    { id: "auh", label: "Abu Dhabi", x: 26, y: 54 },
    { id: "ruh", label: "Riyadh", x: 22, y: 44 },
  ];

  // Paths as polylines through India as hinge
  const arcs = [
    "M78,72 L52,52 L28,48",
    "M72,68 L52,52 L26,54",
    "M70,58 L52,52 L28,48",
    "M88,32 L52,52 L22,44",
    "M52,52 L28,48",
  ];

  return (
    <figure className="w-full" aria-labelledby="atlas-caption">
      <div className="relative min-h-[220px] md:min-h-[280px] rounded-2xl border border-[#1f1f1f] bg-gradient-to-br from-[#0a0c12] via-[#090909] to-[#0d0d0d] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(30,58,95,0.35), transparent 55%), radial-gradient(ellipse at 25% 45%, rgba(245,158,11,0.08), transparent 50%)",
          }}
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 100 100"
          className="w-full h-[220px] md:h-[280px]"
          role="img"
          aria-label="Illustrative strategic corridor map across Asia, India and the GCC"
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
              strokeWidth="0.35"
              className="corridor-arc"
              strokeLinecap="round"
            />
          ))}
          {nodes.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r="1.8"
                className="corridor-node-ring"
                fill="none"
                stroke="#f59e0b"
                strokeOpacity="0.35"
                strokeWidth="0.25"
              />
              <circle cx={n.x} cy={n.y} r="0.9" fill="#f59e0b" className="corridor-node" />
              <text
                x={n.x}
                y={n.y - 2.8}
                textAnchor="middle"
                fill="#a1a1aa"
                fontSize="2.4"
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
        className="mt-2 text-[10px] md:text-[11px] font-mono text-zinc-600 leading-relaxed"
      >
        Illustrative strategic corridor nodes—not office locations. Signal paths represent movement
        of founders, capital, products, distribution, knowledge and partnerships across markets.
      </figcaption>
      <ul className="sr-only">
        {nodes.map((n) => (
          <li key={n.id}>{n.label}</li>
        ))}
      </ul>
    </figure>
  );
}
