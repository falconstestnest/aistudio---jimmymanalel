import React, { useMemo, useState } from "react";
import { Briefcase, Send } from "lucide-react";
import { SERVICE_INTERESTS, submitLead } from "../../lib/leadClient";
import FormStatus from "./FormStatus";
import HoneypotField from "./HoneypotField";

export default function AdvisoryEnquiryForm() {
  const formStartedAt = useMemo(() => Date.now(), []);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [serviceInterest, setServiceInterest] = useState<string>(SERVICE_INTERESTS[0]);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [support, setSupport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    setFieldErrors({});
    setSuccess(null);

    const result = await submitLead({
      leadType: "advisory",
      firstname,
      lastname: lastname || undefined,
      email,
      company,
      website: website || undefined,
      serviceInterest,
      message,
      componentSource: "advisory-enquiry-form",
      leadSourceDetail: "Website advisory enquiry",
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
      setWebsite("");
      setMessage("");
      return;
    }
    setError(result.message);
    if (result.errors) setFieldErrors(result.errors);
  };

  return (
    <div
      id="advisory-enquiry"
      className="scroll-mt-24 rounded-2xl border border-[#1f1f1f] bg-[#0d0d0d] p-6 text-zinc-300 shadow-sm md:p-10"
    >
      <div className="mb-6">
        <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-amber-500">
          Work with Jimmy
        </span>
        <h2 className="mt-2 text-3xl font-sans font-bold tracking-tight text-white">
          Advisory <span className="serif-italic text-amber-500">enquiry</span>
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Startup strategy, investor narrative, GCC entry pathways, venture corridor development, and commerce infrastructure advisory.
        </p>
      </div>

      {success ? (
        <FormStatus success={success} support={support} />
      ) : (
        <form onSubmit={onSubmit} className="relative space-y-4" noValidate>
          <HoneypotField value={honeypot} onChange={setHoneypot} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <input
                required
                type="text"
                placeholder="First name *"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              {fieldErrors.firstname ? <p className="mt-1 text-xs text-rose-400">{fieldErrors.firstname}</p> : null}
            </div>
            <input
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <div>
              <input
                required
                type="email"
                placeholder="Work email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              {fieldErrors.email ? <p className="mt-1 text-xs text-rose-400">{fieldErrors.email}</p> : null}
            </div>
            <div>
              <input
                required
                type="text"
                placeholder="Company or startup *"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              {fieldErrors.company ? <p className="mt-1 text-xs text-rose-400">{fieldErrors.company}</p> : null}
            </div>
          </div>
          <input
            type="text"
            placeholder="Website (optional)"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <div>
            <label className="mb-1.5 block text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
              Service interest
            </label>
            <select
              value={serviceInterest}
              onChange={(e) => setServiceInterest(e.target.value)}
              className="w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {SERVICE_INTERESTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <textarea
              required
              rows={4}
              placeholder="Primary challenge or message *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-none rounded-xl border border-[#1f1f1f] bg-[#050505] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {fieldErrors.message ? <p className="mt-1 text-xs text-rose-400">{fieldErrors.message}</p> : null}
          </div>
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
                <Briefcase className="h-4 w-4" aria-hidden="true" />
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>Send advisory enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
