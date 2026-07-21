import { checkRateLimit } from "./rateLimit.js";
import { submitToHubSpotForm, successSupportCopy } from "./hubspotForms.js";
import type { LeadSubmissionInput, PublicLeadResponse } from "./types.js";
import { validateLeadSubmission } from "./validate.js";

const MAX_BODY_CHARS = 20_000;

export type ProcessLeadResult = {
  status: number;
  body: PublicLeadResponse & { errors?: Record<string, string>; support?: string };
};

export async function processLeadSubmission(
  rawBody: unknown,
  meta: { ip?: string; userAgent?: string }
): Promise<ProcessLeadResult> {
  const serialized = JSON.stringify(rawBody ?? {});
  if (serialized.length > MAX_BODY_CHARS) {
    return {
      status: 413,
      body: {
        success: false,
        message: "Submission is too large.",
      },
    };
  }

  const body = (rawBody || {}) as LeadSubmissionInput;
  const rateKey = `${meta.ip || "unknown"}:${String(body.leadType || "unknown")}`;
  const rate = checkRateLimit(rateKey);
  if (!rate.allowed) {
    return {
      status: 429,
      body: {
        success: false,
        message: "Too many requests. Please wait a moment and try again.",
      },
    };
  }

  const validated = validateLeadSubmission(body);
  if (validated.ok === false) {
    return {
      status: validated.status,
      body: {
        success: false,
        message: validated.message,
        errors: validated.errors,
      },
    };
  }

  const submitted = await submitToHubSpotForm(validated.data, meta.ip);
  if (submitted.body.success) {
    return {
      status: submitted.status,
      body: {
        ...submitted.body,
        support: successSupportCopy(validated.data.leadType),
      },
    };
  }

  return {
    status: submitted.status,
    body: submitted.body,
  };
}
