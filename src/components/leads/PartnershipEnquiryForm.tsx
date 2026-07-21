import React, { useMemo, useState } from "react";
import { Users, Send } from "lucide-react";
import { PARTNERSHIP_TYPES, submitLead } from "../../lib/leadClient";
import FormStatus from "./FormStatus";
import HoneypotField from "./HoneypotField";

export default function PartnershipEnquiryForm() {
  const formStartedAt = useMemo(() => Date.now(), []);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [partnershipType, setPartnershipType] = useState<string>(PARTNERSHIP_TYPES[0]);
  const [message, setMessage] = useState("");
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
      leadType: "partnership",
      firstname,
      lastname: lastname || undefined,
      email,
      company,
      partnershipType,
      message,
      componentSource: "partnership-enquiry-form",
      leadSourceDetail: "Website partnership enquiry",
      formStartedAt,
      companyFax: honeypot,
    });

    setLoading(false);
    if (result.success) {
      setSuccess(result.message);
      setSupport(result.support || null);
      setFirstname("");
      setLastname("");
      setEmail("");
      setCompany("");
      setMessage("");
      return;
    }
    setError(result.message);
  };

  return (
    <div
      id="partnership-enquiry"
      className="scroll-mt-24 rounded-2xl border border-[#1f1f1f] bg-[#0d0d0d] p-6 text-zinc-300 shadow-sm md:p-10"
    >
      <div className="mb-6">
        <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-amber-500">
          Ecosystem & Collaboration
        </span>
        <h2 className="mt-2 text-3xl font-sans font-bold tracking-tight text-white">
          Partnership <span className="serif-italic text-amber-500">enquiry</span>
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Speaking requests, founder-community collaboration, ecosystem partnerships, and strategic programme introductions.
        </p>
      </div>

      {success ? (
        <FormStatus success={success} support={support} />
      ) : (
        <form onSubmit={onSubmit} className="relative space-y-4" noValidate>
          <HoneypotField value={honeypot} onChange={setHoneypot} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              required
              type="text"
              placeholder="First name *"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <input
              required
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <input
              required
              type="text"
              placeholder="Organisation *"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
              Enquiry type
            </label>
            <select
              value={partnershipType}
              onChange={(e) => setPartnershipType(e.target.value)}
              className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {PARTNERSHIP_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <textarea
            required
            rows={4}
            placeholder="Message *"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <p className="text-xs text-zinc-500">
            Submitted information will be used to respond to your enquiry. This is not a marketing subscription.
          </p>
          {error ? <FormStatus error={error} /> : null}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
            ) : (
              <>
                <Users className="h-4 w-4" aria-hidden="true" />
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>Send partnership enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
