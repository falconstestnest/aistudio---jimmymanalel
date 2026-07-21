import React from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Visible FAQ content — answers are always in the DOM (not JS-only).
 * Suitable for FAQPage JSON-LD when paired with matching schema.
 */
export default function FaqSection({
  title = "Common questions",
  items,
}: {
  title?: string;
  items: FaqItem[];
}) {
  if (!items.length) return null;

  return (
    <section className="space-y-6" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-sans font-bold text-white tracking-tight">
        {title}
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-2xl border border-[#1f1f1f] bg-[#0b0b0b] p-5 md:p-6"
          >
            <h3 className="text-base font-sans font-semibold text-white">{item.question}</h3>
            <p className="mt-2 text-sm md:text-base text-zinc-400 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
