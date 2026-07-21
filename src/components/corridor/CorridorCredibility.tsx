import React from "react";

const points = [
  "More than ten years building and operating in the UAE",
  "Co-founder of Plantshop.ae",
  "More than 800 founders mentored through 1trepreneur community programmes in Dubai",
  "Co-founded and helped run 1trepreneur",
  "Helped create and conduct 1Tank at Expand North Star",
  "Practical experience in e-commerce, supply chains, fulfilment, customer acquisition, unit economics and operating systems",
];

export default function CorridorCredibility() {
  return (
    <section className="space-y-4" aria-labelledby="corridor-credibility">
      <h2 id="corridor-credibility" className="text-xl md:text-2xl font-sans font-bold text-white">
        Operating experience behind the corridor
      </h2>
      <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed">
        Evidence behind the work—not vanity counters, client tallies or investment claims.
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {points.map((p) => (
          <li
            key={p}
            className="rounded-xl border border-[#1f1f1f] bg-[#0b0b0b] px-4 py-3 text-sm text-zinc-400 leading-relaxed border-l-2 border-l-amber-500/40"
          >
            {p}
          </li>
        ))}
      </ul>
    </section>
  );
}
