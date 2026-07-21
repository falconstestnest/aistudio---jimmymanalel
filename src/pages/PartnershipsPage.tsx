import React from "react";
import { Handshake } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import PartnershipEnquiryForm from "../components/leads/PartnershipEnquiryForm";

export default function PartnershipsPage() {
  return (
    <PageShell>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
            <Handshake className="w-3 h-3" aria-hidden="true" />
            Ecosystem collaboration
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
            Ecosystem &amp; strategic partnerships
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Speaking requests, founder-community collaboration, ecosystem programmes, and strategic
            introductions. Share your organisation and how you want to work together.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-400">
            {[
              "Speaking request",
              "Founder-community collaboration",
              "Ecosystem partnership",
              "Startup-programme collaboration",
              "Strategic partnership",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[#1f1f1f] bg-[#0b0b0b] px-4 py-3"
              >
                {item}
              </div>
            ))}
          </div>
        </header>

        <PartnershipEnquiryForm />
      </main>
    </PageShell>
  );
}
