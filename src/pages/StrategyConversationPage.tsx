import React from "react";
import { CalendarCheck2 } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import BookingForm from "../components/BookingForm";

export default function StrategyConversationPage() {
  return (
    <PageShell>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
            <CalendarCheck2 className="w-3 h-3" aria-hidden="true" />
            Strategy access
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
            Request a strategy conversation
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Share what you want to discuss and your preferred timing. This is a{" "}
            <strong className="text-zinc-300 font-semibold">request</strong>, not an automatically
            confirmed calendar reservation. Jimmy reviews each enquiry and responds with next steps.
          </p>
          <ul className="text-sm text-zinc-500 space-y-1.5 list-disc list-inside">
            <li>Founder strategy and corridor positioning</li>
            <li>Investor narrative and readiness</li>
            <li>GCC expansion and commerce infrastructure</li>
          </ul>
        </header>

        <BookingForm />
      </main>
    </PageShell>
  );
}
