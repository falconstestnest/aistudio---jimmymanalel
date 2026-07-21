import type { LeadType, PublicLeadResponse, ValidatedLead } from "./types.js";
import { getPortalId, resolveFormId } from "./validate.js";
import { getRuntimeEnv, isDryRunAllowed, logLeadConfigOnce } from "./env.js";

const HS_SUBMIT_BASE = "https://api.hsforms.com/submissions/v3/integration/submit";

export async function submitToHubSpotForm(
  validated: ValidatedLead,
  ipAddress?: string
): Promise<{ status: number; body: PublicLeadResponse; hubspotStatus?: number }> {
  logLeadConfigOnce();

  const portalId = getPortalId();
  const formId = resolveFormId(validated.leadType);

  if (!portalId || !formId) {
    // Production (and any env where dry-run is not allowed): fail closed — never fake success.
    if (!isDryRunAllowed()) {
      console.error("[leads] configuration incomplete; refusing submission", {
        runtime: getRuntimeEnv(),
        leadType: validated.leadType,
        hasPortal: Boolean(portalId),
        hasForm: Boolean(formId),
      });
      return {
        status: 503,
        body: {
          success: false,
          code: "lead_service_unavailable",
          message:
            "Lead capture is temporarily unavailable. Your details were not submitted — please try again shortly or email directly.",
        },
      };
    }

    // Development / opted-in preview only — explicit dry-run, not a CRM write.
    return {
      status: 200,
      body: {
        success: true,
        dryRun: true,
        leadType: validated.leadType,
        message:
          "Dry-run only: no HubSpot submission occurred. Configure portal and form IDs for live capture.",
      },
    };
  }

  const context: Record<string, string> = {};
  if (validated.context.pageUri) context.pageUri = validated.context.pageUri;
  if (validated.context.pageName) context.pageName = validated.context.pageName;
  if (validated.context.hutk) context.hutk = validated.context.hutk;
  if (ipAddress) context.ipAddress = ipAddress;

  const payload = {
    fields: validated.fields,
    context,
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12_000);

    const response = await fetch(`${HS_SUBMIT_BASE}/${portalId}/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (response.ok) {
      return {
        status: 200,
        hubspotStatus: response.status,
        body: {
          success: true,
          dryRun: false,
          leadType: validated.leadType as LeadType,
          message: successMessage(validated.leadType),
        },
      };
    }

    // Log only non-PII diagnostics
    console.error("HubSpot forms submit failed", {
      leadType: validated.leadType,
      status: response.status,
      // never log payload fields or token
    });

    if (response.status === 429) {
      return {
        status: 429,
        hubspotStatus: 429,
        body: {
          success: false,
          message: "Too many requests. Please wait a moment and try again.",
        },
      };
    }

    if (response.status >= 500) {
      return {
        status: 502,
        hubspotStatus: response.status,
        body: {
          success: false,
          message: "The message could not be sent. Please try again shortly.",
        },
      };
    }

    // 400 — often missing form fields / properties
    return {
      status: 502,
      hubspotStatus: response.status,
      body: {
        success: false,
        message:
          "The message could not be sent. Your details are still with you — please try again or email directly.",
      },
    };
  } catch (error: any) {
    const aborted = error?.name === "AbortError";
    console.error("HubSpot forms submit error", {
      leadType: validated.leadType,
      aborted,
    });
    return {
      status: aborted ? 504 : 502,
      body: {
        success: false,
        message: aborted
          ? "The connection paused before your request completed. Please try again."
          : "The message could not be sent. Please try again, or use the email option on the page.",
      },
    };
  }
}

function successMessage(leadType: LeadType): string {
  if (leadType === "booking") {
    return "Your request has been received.";
  }
  if (leadType === "assessment") {
    return "Your results request is on its way.";
  }
  return "Your message is on its way.";
}

export function successSupportCopy(leadType: LeadType): string {
  if (leadType === "booking") {
    return "I’ll review the details and follow up regarding the meeting.";
  }
  if (leadType === "assessment") {
    return "A concise summary of your results has been recorded. I’ll follow up if a conversation would be useful.";
  }
  return "Thank you for reaching out. I’ll review it and respond as soon as possible.";
}
