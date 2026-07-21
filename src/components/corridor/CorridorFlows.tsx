import React from "react";

const flows = [
  {
    title: "Asia to GCC",
    items: [
      "Market access",
      "Distribution",
      "Commercial partnerships",
      "Capital readiness",
      "Regional expansion",
    ],
  },
  {
    title: "GCC to Asia",
    items: [
      "Technology",
      "Innovation partnerships",
      "Consumer opportunities",
      "Manufacturing relationships",
      "Ecosystem access",
    ],
  },
  {
    title: "India as the connecting layer",
    items: [
      "Founders",
      "Engineering",
      "Operations",
      "Talent",
      "Commercial execution",
    ],
  },
];

export default function CorridorFlows() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {flows.map((f) => (
        <div
          key={f.title}
          className="rounded-2xl border border-[#1f1f1f] bg-[#090909]/80 p-5 backdrop-blur-sm"
        >
          <h3 className="text-sm font-sans font-bold text-white tracking-tight">{f.title}</h3>
          <ul className="mt-3 space-y-1.5">
            {f.items.map((item) => (
              <li
                key={item}
                className="text-xs font-mono text-zinc-500 border-l border-amber-500/30 pl-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
