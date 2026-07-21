import type { LeadType } from "../../lib/leads/types";

export type ClientLeadPayload = {
  leadType: LeadType;
  firstname: string;
  lastname?: string;
  email: string;
  company?: string;
  website?: string;
  message?: string;
  serviceInterest?: string;
  partnershipType?: string;
  preferredMeetingDate?: string;
  preferredMeetingTime?: string;
  toolUsed?: string;
  assessmentScore?: string | number;
  assessmentSummary?: string;
  leadSourceDetail?: string;
  componentSource?: string;
  formStartedAt: number;
  companyFax?: string;
};

export type LeadSubmitResult = {
  ok: boolean;
  status: number;
  success: boolean;
  message: string;
  support?: string;
  dryRun?: boolean;
  errors?: Record<string, string>;
};

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function utmFromSearch(): Record<string, string | undefined> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmTerm: params.get("utm_term") || undefined,
    utmContent: params.get("utm_content") || undefined,
  };
}

export async function submitLead(payload: ClientLeadPayload): Promise<LeadSubmitResult> {
  const utm = utmFromSearch();
  const body = {
    ...payload,
    ...utm,
    pageUri: typeof window !== "undefined" ? window.location.href : undefined,
    pageName: typeof document !== "undefined" ? document.title : undefined,
    referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
    hutk: readCookie("hubspotutk"),
  };

  try {
    const res = await fetch("/api/leads/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return {
      ok: res.ok,
      status: res.status,
      success: !!data.success,
      message: data.message || (res.ok ? "Submitted." : "Submission failed."),
      support: data.support,
      dryRun: data.dryRun,
      errors: data.errors,
    };
  } catch {
    return {
      ok: false,
      status: 0,
      success: false,
      message: "The connection paused. Check your connection and try again.",
    };
  }
}

export { SERVICE_INTERESTS, PARTNERSHIP_TYPES } from "../../lib/leads/types";
