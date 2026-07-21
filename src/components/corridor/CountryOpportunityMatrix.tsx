import React from "react";

type Market = {
  name: string;
  role: string;
  sectors: string[];
  opportunity: string;
  validate: string[];
  assess: string[];
  limits: string;
};

const markets: Market[] = [
  {
    name: "Singapore",
    role: "Capital, technology and regional headquarters.",
    sectors: [
      "Deep technology",
      "AI and digital economy",
      "Agrifood",
      "Sustainability",
      "Medtech",
      "Advanced manufacturing",
      "RHQ strategy",
    ],
    opportunity: "GCC commercialisation and operator readiness for regional startups and platforms.",
    validate: ["Beachhead use case", "Pricing transfer", "Partnership vs direct entry"],
    assess: ["Narrative for GCC buyers", "Operating load", "Capital readiness story"],
    limits: "Not Singapore regulatory expertise or a local regulated practice.",
  },
  {
    name: "Malaysia",
    role: "Scalable technology, commerce and ASEAN commercialisation.",
    sectors: [
      "E-commerce",
      "Fintech",
      "Islamic economy",
      "Agritech",
      "Cleantech",
      "Manufacturing",
      "Semiconductor-adjacent",
    ],
    opportunity: "Commercial pathways from Malaysia into the UAE and wider GCC.",
    validate: ["Unit economics after logistics", "Local partner logic", "Brand fit"],
    assess: ["Margin resilience", "Distribution options", "Founder readiness"],
    limits: "No claim of formal government programme roles unless separately verified.",
  },
  {
    name: "Thailand",
    role: "Consumer, wellness, food, agriculture, logistics and digital industries.",
    sectors: [
      "Wellness",
      "Food and agriculture",
      "Digital platforms",
      "Logistics",
      "Health-related",
      "Mobility",
      "Renewables",
      "Consumer commerce",
    ],
    opportunity: "GCC market-entry readiness for Thai companies with clear product differentiation.",
    validate: ["Distribution model", "Pricing", "Regulatory path with counsel"],
    assess: ["Commercial narrative", "Partnership structure", "Operating plan"],
    limits: "Does not include Thai legal, tax or visa advice.",
  },
  {
    name: "South Korea",
    role: "Advanced technology, consumer products, cultural industries and manufacturing.",
    sectors: [
      "ICT and AI",
      "Consumer goods",
      "Cultural content",
      "Robotics",
      "Advanced manufacturing",
      "Semiconductors",
      "Batteries",
      "Biotechnology",
      "Logistics",
    ],
    opportunity:
      "Commercial translation of product strength into GCC relevance and partnership logic.",
    validate: ["Market relevance", "Channel strategy", "Local partner incentives"],
    assess: ["Narrative vs evidence", "Execution risk", "Operating economics"],
    limits: "No claim of Korean-language capability or a local Korean office.",
  },
  {
    name: "India",
    role: "Founder, talent, technology and operating layer.",
    sectors: ["Founders", "Engineering", "Operations", "Talent", "Commercial execution"],
    opportunity:
      "Connecting layer between Asian innovation markets and GCC commercial scale—not a low-cost outsourcing frame.",
    validate: ["Team capacity for second market", "Cross-border ops design"],
    assess: ["Execution systems", "Narrative cohesion", "Partnership fit"],
    limits: "Not a claim of exclusive deal flow or institutional mandates.",
  },
  {
    name: "GCC",
    role: "Capital, distribution, regional market access and commercial scale.",
    sectors: ["UAE beachhead", "Regional access", "Partnerships", "Distribution", "Capital conversations"],
    opportunity: "Destination and operating markets for serious commercial movement.",
    validate: ["Country sequence", "Margin after last-mile", "Licensing via counsel"],
    assess: ["Readiness gaps", "Operator plan", "Investor narrative honesty"],
    limits: "Not legal, tax, visa, or regulated investment advice.",
  },
];

export default function CountryOpportunityMatrix() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {markets.map((m) => (
        <article
          key={m.name}
          className="rounded-2xl border border-[#1f1f1f] bg-[#0b0b0b] p-5 space-y-3 flex flex-col"
        >
          <header>
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">Market</p>
            <h3 className="text-lg font-sans font-bold text-white mt-0.5">{m.name}</h3>
            <p className="serif-italic text-sm text-zinc-300 mt-1 leading-snug">{m.role}</p>
          </header>
          <p className="text-xs text-zinc-500 leading-relaxed">{m.opportunity}</p>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 mb-1.5">
              Relevant sectors
            </p>
            <ul className="flex flex-wrap gap-1">
              {m.sectors.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-[#1f1f1f] px-2 py-0.5 text-[10px] font-mono text-zinc-500"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 mb-1">
              Validate
            </p>
            <ul className="text-xs text-zinc-500 space-y-0.5 list-disc pl-4">
              {m.validate.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 mb-1">
              What Jimmy can assess
            </p>
            <ul className="text-xs text-zinc-500 space-y-0.5 list-disc pl-4">
              {m.assess.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <p className="mt-auto pt-2 text-[10px] leading-relaxed text-zinc-600 border-t border-[#1f1f1f]">
            Limits: {m.limits}
          </p>
        </article>
      ))}
    </div>
  );
}
