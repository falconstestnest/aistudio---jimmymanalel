import React from "react";
import { Link } from "react-router";
import { ROUTES } from "../../lib/siteRoutes";

export default function PrivateConversationClose() {
  return (
    <section
      className="rounded-3xl border border-[#1f1f1f] bg-gradient-to-br from-[#0a0c12] via-[#0d0d0d] to-[#090909] p-8 md:p-12 text-center space-y-5"
      aria-labelledby="private-conversation"
    >
      <h2
        id="private-conversation"
        className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight max-w-2xl mx-auto"
      >
        Some opportunities require more than a contact form.
      </h2>
      <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
        For founders, investors and institutions exploring serious commercial movement between Asia,
        India and the GCC.
      </p>
      <p className="text-xs text-zinc-600 max-w-md mx-auto leading-relaxed">
        Requests are reviewed individually. Not a guarantee of acceptance, investor access or private
        deal flow.
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Link
          to={ROUTES.strategyConversation}
          className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-black hover:bg-amber-400 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          Request a Private Strategy Conversation
        </Link>
        <Link
          to={`${ROUTES.asiaGcc}#ecosystems`}
          className="inline-flex items-center justify-center rounded-xl border border-[#1f1f1f] px-6 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          Propose an Ecosystem Partnership
        </Link>
      </div>
    </section>
  );
}
