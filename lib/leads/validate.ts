import {
  LEAD_TYPES,
  PARTNERSHIP_TYPES,
  SERVICE_INTERESTS,
  type FieldErrorMap,
  type LeadSubmissionInput,
  type LeadType,
  type ValidatedLead,
} from "./types";

const MAX = {
  name: 80,
  email: 120,
  company: 120,
  website: 200,
  message: 4000,
  summary: 1500,
  tool: 80,
  score: 40,
  source: 120,
  utm: 120,
  url: 500,
  date: 32,
  time: 40,
} as const;

const MIN_FORM_MS = 2500;
const MAX_FORM_MS = 1000 * 60 * 60 * 6; // 6 hours

function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/\0/g, "")
    .trim()
    .slice(0, max);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function pushField(
  fields: ValidatedLead["fields"],
  name: string,
  value: string | undefined
) {
  if (!value) return;
  fields.push({ objectTypeId: "0-1", name, value });
}

export function validateLeadSubmission(
  body: LeadSubmissionInput,
  options?: { now?: number; skipTiming?: boolean }
): { ok: true; data: ValidatedLead } | { ok: false; status: number; errors: FieldErrorMap; message: string } {
  const now = options?.now ?? Date.now();
  const errors: FieldErrorMap = {};

  // Honeypot
  if (clean(body.companyFax, 200)) {
    return {
      ok: false,
      status: 400,
      errors: { form: "Unable to process this submission." },
      message: "Unable to process this submission.",
    };
  }

  // Timing
  if (!options?.skipTiming) {
    const started = Number(body.formStartedAt);
    if (!Number.isFinite(started)) {
      errors.form = "Please complete the form and try again.";
    } else {
      const elapsed = now - started;
      if (elapsed < MIN_FORM_MS || elapsed > MAX_FORM_MS) {
        errors.form = "Please take a moment to review your details, then submit again.";
      }
    }
  }

  const leadTypeRaw = clean(body.leadType, 40).toLowerCase();
  if (!LEAD_TYPES.includes(leadTypeRaw as LeadType)) {
    return {
      ok: false,
      status: 400,
      errors: { leadType: "Unknown lead type." },
      message: "Unknown lead type.",
    };
  }
  const leadType = leadTypeRaw as LeadType;

  const firstname = clean(body.firstname, MAX.name);
  const lastname = clean(body.lastname, MAX.name);
  const email = clean(body.email, MAX.email).toLowerCase();
  const company = clean(body.company, MAX.company);
  const website = clean(body.website, MAX.website);
  const message = clean(body.message, MAX.message);
  const serviceInterest = clean(body.serviceInterest, 120);
  const partnershipType = clean(body.partnershipType, 120);
  const preferredMeetingDate = clean(body.preferredMeetingDate, MAX.date);
  const preferredMeetingTime = clean(body.preferredMeetingTime, MAX.time);
  const toolUsed = clean(body.toolUsed, MAX.tool);
  const assessmentScore = clean(body.assessmentScore, MAX.score);
  const assessmentSummary = clean(body.assessmentSummary, MAX.summary);
  const leadSourceDetail = clean(body.leadSourceDetail, MAX.source);
  const componentSource = clean(body.componentSource, MAX.source);

  if (!firstname) errors.firstname = "First name is required.";
  if (!email) errors.email = "Work email is required.";
  else if (!isEmail(email)) errors.email = "Enter a valid email address.";

  if (website && !/^https?:\/\/.+/i.test(website) && !/^[a-z0-9.-]+\.[a-z]{2,}/i.test(website)) {
    errors.website = "Enter a valid website URL.";
  }

  if (leadType === "advisory") {
    if (!company) errors.company = "Company or startup is required.";
    if (!serviceInterest) errors.serviceInterest = "Select a service interest.";
    else if (!SERVICE_INTERESTS.includes(serviceInterest as (typeof SERVICE_INTERESTS)[number])) {
      errors.serviceInterest = "Select a valid service interest.";
    }
    if (!message) errors.message = "Tell us about your primary challenge.";
  }

  if (leadType === "booking") {
    if (!preferredMeetingDate) errors.preferredMeetingDate = "Select a preferred date.";
    else if (!isIsoDate(preferredMeetingDate)) {
      errors.preferredMeetingDate = "Preferred date is invalid.";
    } else {
      const day = new Date(`${preferredMeetingDate}T12:00:00Z`);
      const weekday = day.getUTCDay();
      if (weekday === 0 || weekday === 6) {
        errors.preferredMeetingDate = "Please choose a weekday.";
      }
    }
    if (!preferredMeetingTime) errors.preferredMeetingTime = "Select a preferred time.";
    if (!message) errors.message = "Share what you would like to discuss.";
    if (serviceInterest && !SERVICE_INTERESTS.includes(serviceInterest as (typeof SERVICE_INTERESTS)[number])) {
      errors.serviceInterest = "Select a valid service interest.";
    }
  }

  if (leadType === "assessment") {
    if (!toolUsed) errors.toolUsed = "Tool used is required.";
    if (!assessmentSummary && !assessmentScore) {
      errors.assessmentSummary = "Assessment result is required.";
    }
  }

  if (leadType === "partnership") {
    if (!company) errors.company = "Organisation is required.";
    if (!partnershipType) errors.partnershipType = "Select an enquiry type.";
    else if (!PARTNERSHIP_TYPES.includes(partnershipType as (typeof PARTNERSHIP_TYPES)[number])) {
      errors.partnershipType = "Select a valid enquiry type.";
    }
    if (!message) errors.message = "Message is required.";
  }

  if (Object.keys(errors).length) {
    return {
      ok: false,
      status: 400,
      errors,
      message: "Please correct the highlighted fields.",
    };
  }

  const fields: ValidatedLead["fields"] = [];
  pushField(fields, "firstname", firstname);
  pushField(fields, "lastname", lastname || undefined);
  pushField(fields, "email", email);
  pushField(fields, "company", company || undefined);

  const normalizedWebsite =
    website && !/^https?:\/\//i.test(website) ? `https://${website}` : website;
  pushField(fields, "website", normalizedWebsite || undefined);
  pushField(fields, "message", message || assessmentSummary || undefined);

  // Custom properties — must exist on the HubSpot portal / form
  pushField(fields, "website_lead_type", leadType);
  pushField(fields, "service_interest", serviceInterest || partnershipType || undefined);
  pushField(fields, "lead_source_detail", leadSourceDetail || componentSource || "jimmymanalel.com direct");
  pushField(fields, "tool_used", toolUsed || undefined);
  pushField(fields, "assessment_score", assessmentScore || undefined);
  pushField(fields, "preferred_meeting_date", preferredMeetingDate || undefined);
  pushField(fields, "preferred_meeting_time", preferredMeetingTime || undefined);
  pushField(fields, "utm_source", clean(body.utmSource, MAX.utm) || undefined);
  pushField(fields, "utm_medium", clean(body.utmMedium, MAX.utm) || undefined);
  pushField(fields, "utm_campaign", clean(body.utmCampaign, MAX.utm) || undefined);
  pushField(fields, "utm_term", clean(body.utmTerm, MAX.utm) || undefined);
  pushField(fields, "utm_content", clean(body.utmContent, MAX.utm) || undefined);
  pushField(fields, "landing_page", clean(body.pageUri, MAX.url) || undefined);
  pushField(fields, "original_page_url", clean(body.pageUri, MAX.url) || undefined);
  pushField(fields, "primary_challenge", leadType === "advisory" || leadType === "booking" ? message : undefined);

  if (leadType === "partnership") {
    pushField(fields, "service_interest", partnershipType);
  }

  const pageUri = clean(body.pageUri, MAX.url) || undefined;
  const pageName = clean(body.pageName, 200) || undefined;
  const hutk = clean(body.hutk, 120) || undefined;

  return {
    ok: true,
    data: {
      leadType,
      fields,
      context: {
        pageUri,
        pageName,
        hutk,
      },
    },
  };
}

export function resolveFormId(leadType: LeadType): string | undefined {
  const map: Record<LeadType, string | undefined> = {
    advisory: process.env.HUBSPOT_FORM_ID_ADVISORY,
    booking: process.env.HUBSPOT_FORM_ID_BOOKING,
    assessment: process.env.HUBSPOT_FORM_ID_ASSESSMENT,
    partnership: process.env.HUBSPOT_FORM_ID_PARTNERSHIP,
  };
  const id = map[leadType]?.trim();
  return id || undefined;
}

export function getPortalId(): string | undefined {
  return process.env.HUBSPOT_PORTAL_ID?.trim() || undefined;
}
