import React, { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { submitLead } from "../../lib/leadClient";
import FormStatus from "./FormStatus";
import HoneypotField from "./HoneypotField";

const AUDIENCES = [
  "Founder",
  "Investor or VC",
  "Family office or private investor",
  "Accelerator or incubator",
  "Government or ecosystem organisation",
  "Corporate innovation team",
  "Potential strategic partner",
] as const;

const COUNTRIES = [
  "Singapore",
  "Malaysia",
  "Thailand",
  "South Korea",
  "India",
  "UAE",
  "Other",
] as const;

const STAGES = [
  "Pre-seed / idea",
  "Seed",
  "Series A+",
  "Growth / profitable",
  "Not a startup (investor or institution)",
] as const;

const OBJECTIVES = [
  "GCC market-entry readiness",
  "Operator-led venture assessment",
  "Investor or founder narrative review",
  "Ecosystem or programme design",
  "Private strategy conversation",
  "Other",
] as const;

const SUPPORT_TYPES = [
  "GCC Readiness Diagnostic",
  "Cross-Border Strategy Sprint",
  "Operator-Led Commercial Assessment",
  "Founder and Investor Narrative Review",
  "Ecosystem Market-Access Programme",
  "Private Strategy Conversation",
] as const;

type Props = {
  /** Anchor id for scroll targets, e.g. asia-gcc-enquiry */
  id?: string;
  defaultAudience?: string;
};

/**
 * Asia–GCC corridor enquiry. Submits via existing /api/leads/submit as an advisory lead
 * with structured context in the message body (no HubSpot jargon in the UI).
 */
export default function AsiaGccEnquiryForm({ id = "asia-gcc-enquiry", defaultAudience }: Props) {
  const formStartedAt = useMemo(() => Date.now(), []);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [website, setWebsite] = useState("");
  const [audience, setAudience] = useState(defaultAudience || AUDIENCES[0]);
  const [country, setCountry] = useState<string>(COUNTRIES[0]);
  const [sector, setSector] = useState("");
  const [stage, setStage] = useState<string>(STAGES[0]);
  const [revenueRange, setRevenueRange] = useState("");
  const [targetMarket, setTargetMarket] = useState("UAE / GCC");
  const [objective, setObjective] = useState<string>(OBJECTIVES[0]);
  const [timeline, setTimeline] = useState("");
  const [supportType, setSupportType] = useState<string>(SUPPORT_TYPES[0]);
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

    const structured = [
      "Asia–GCC corridor enquiry",
      `Audience: ${audience}`,
      `Country: ${country}`,
      `Role: ${role || "—"}`,
      `Sector: ${sector || "—"}`,
      `Stage: ${stage}`,
      `Revenue range (optional): ${revenueRange || "—"}`,
      `Target market: ${targetMarket}`,
      `Primary objective: ${objective}`,
      `Expansion timeline: ${timeline || "—"}`,
      `Support requested: ${supportType}`,
      "",
      message || "No additional notes.",
    ].join("\n");

    const result = await submitLead({
      leadType: "advisory",
      firstname,
      lastname: lastname || undefined,
      email,
      company,
      website: website || undefined,
      serviceInterest: "GCC Expansion Pathways",
      message: structured,
      componentSource: "asia-gcc-enquiry-form",
      leadSourceDetail: `Asia-GCC · ${audience} · ${country}`,
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
      setRole("");
      setWebsite("");
      setSector("");
      setRevenueRange("");
      setTimeline("");
      setMessage("");
      return;
    }
    setError(result.message);
  };

  const fieldClass =
    "w-full rounded-xl border border-[#1f1f1f] bg-[#050505] px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500";

  return (
    <div
      id={id}
      className="scroll-mt-24 rounded-2xl border border-[#1f1f1f] bg-[#0d0d0d] p-6 text-zinc-300 shadow-sm md:p-10"
    >
      <div className="mb-6">
        <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-amber-500">
          Asia–GCC corridors
        </span>
        <h2 className="mt-2 text-2xl md:text-3xl font-sans font-bold tracking-tight text-white">
          Corridor <span className="serif-italic text-amber-500">enquiry</span>
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Tell us who you are and what you want to explore. This is a request for strategic
          conversation—not legal, tax, visa, or regulated investment advice.
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
              className={fieldClass}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className={fieldClass}
            />
            <input
              required
              type="email"
              placeholder="Work email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
            <input
              required
              type="text"
              placeholder="Company or organisation *"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={fieldClass}
            />
            <input
              type="text"
              placeholder="Role / title"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={fieldClass}
            />
            <input
              type="text"
              placeholder="Website (optional)"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className={fieldClass}
            />

            <label className="block text-xs text-zinc-500">
              Audience type *
              <select
                required
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className={`${fieldClass} mt-1`}
              >
                {AUDIENCES.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-xs text-zinc-500">
              Country *
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`${fieldClass} mt-1`}
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <input
              type="text"
              placeholder="Sector"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className={fieldClass}
            />

            <label className="block text-xs text-zinc-500">
              Startup stage
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className={`${fieldClass} mt-1`}
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <input
              type="text"
              placeholder="Current revenue range (optional)"
              value={revenueRange}
              onChange={(e) => setRevenueRange(e.target.value)}
              className={fieldClass}
            />
            <input
              type="text"
              placeholder="Target market"
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              className={fieldClass}
            />

            <label className="block text-xs text-zinc-500">
              Primary objective
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className={`${fieldClass} mt-1`}
              >
                {OBJECTIVES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>

            <input
              type="text"
              placeholder="Expansion timeline"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className={fieldClass}
            />

            <label className="block text-xs text-zinc-500 md:col-span-2">
              Type of support requested
              <select
                value={supportType}
                onChange={(e) => setSupportType(e.target.value)}
                className={`${fieldClass} mt-1`}
              >
                {SUPPORT_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <textarea
            rows={4}
            placeholder="Context, constraints, or questions"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={fieldClass}
          />

          {error ? <FormStatus error={error} /> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-amber-400 disabled:opacity-50"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {loading ? "Sending…" : "Submit corridor enquiry"}
          </button>
        </form>
      )}
    </div>
  );
}
