import React, { useMemo, useState } from "react";
import { Mail, Send } from "lucide-react";
import { submitLead } from "../../lib/leadClient";
import FormStatus from "./FormStatus";
import HoneypotField from "./HoneypotField";

type Props = {
  toolUsed: string;
  assessmentScore?: string | number;
  assessmentSummary: string;
  serviceInterest?: string;
  componentSource: string;
};

export default function EmailResultsCapture({
  toolUsed,
  assessmentScore,
  assessmentSummary,
  serviceInterest,
  componentSource,
}: Props) {
  const formStartedAt = useMemo(() => Date.now(), []);
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [support, setSupport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    const result = await submitLead({
      leadType: "assessment",
      firstname,
      email,
      company: company || undefined,
      website: website || undefined,
      toolUsed,
      assessmentScore,
      assessmentSummary: assessmentSummary.slice(0, 1500),
      serviceInterest,
      componentSource,
      leadSourceDetail: `Assessment — ${toolUsed}`,
      formStartedAt,
      companyFax: honeypot,
    });

    setLoading(false);
    if (result.success) {
      setSuccess(result.message);
      setSupport(result.support || null);
      setFirstname("");
      setEmail("");
      setCompany("");
      setWebsite("");
      return;
    }
    setError(result.message);
  };

  if (success) {
    return <FormStatus success={success} support={support} />;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative space-y-3 rounded-2xl border border-[#1f1f1f] bg-[#090909] p-5"
      noValidate
    >
      <div className="flex items-center gap-2 text-amber-500">
        <Mail className="h-4 w-4" aria-hidden="true" />
        <h4 className="text-sm font-sans font-bold text-white">Email me my results</h4>
      </div>
      <p className="text-xs text-zinc-500">
        We’ll use these details only to send your summary and respond if a conversation would help.
        Not a marketing subscription.
      </p>
      <HoneypotField value={honeypot} onChange={setHoneypot} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          required
          type="text"
          placeholder="First name *"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <input
          required
          type="email"
          placeholder="Work email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <input
          type="text"
          placeholder="Company or startup"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <input
          type="text"
          placeholder="Website (optional)"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>
      {error ? <FormStatus error={error} /> : null}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {loading ? "Sending…" : "Email my results"}
      </button>
    </form>
  );
}
