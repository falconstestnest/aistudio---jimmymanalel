/**
 * Shared HubSpot contact sync helpers for Vercel serverless + Express.
 * Matches frontend payloads from BookingForm, PitchGrader, GrowthMarketingHub.
 */

export type HubSpotLeadInput = {
  email?: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  message?: string;
  source?: string;
  details?: string;
  // Alternate shapes (defensive)
  firstName?: string;
  lastName?: string;
  lead?: HubSpotLeadInput;
};

export type HubSpotSyncResult = {
  success: boolean;
  dryRun?: boolean;
  contactId?: string;
  message: string;
  payloadSent?: Record<string, unknown>;
  rawResponse?: unknown;
  error?: string;
  details?: unknown;
};

const HUBSPOT_CONTACTS_URL = "https://api.hubapi.com/crm/v3/objects/contacts";

export function normalizeLeadBody(body: HubSpotLeadInput | null | undefined): {
  email: string;
  firstname: string;
  lastname: string;
  company: string;
  message: string;
  source: string;
  details: string;
} | null {
  if (!body || typeof body !== "object") return null;
  const nested = body.lead && typeof body.lead === "object" ? body.lead : null;
  const src = nested || body;

  const email = String(src.email || "").trim();
  if (!email) return null;

  return {
    email,
    firstname: String(src.firstname || src.firstName || "Founder").trim() || "Founder",
    lastname: String(src.lastname || src.lastName || "User").trim() || "User",
    company: String(src.company || "Unspecified Venture").trim() || "Unspecified Venture",
    message: String(src.message || "No custom message provided.").trim(),
    source: String(src.source || "jimmymanalel.com").trim(),
    details: String(src.details || "").trim(),
  };
}

export function buildContactProperties(lead: NonNullable<ReturnType<typeof normalizeLeadBody>>) {
  // Use only widely available default contact properties so new portals accept the payload.
  // Extra narrative is stored after create as a CRM note when live-synced.
  const noteBody = [
    lead.message,
    lead.details ? `Details: ${lead.details}` : "",
    `Source: ${lead.source}`,
    "Submitted via www.jimmymanalel.com",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    properties: {
      email: lead.email,
      firstname: lead.firstname,
      lastname: lead.lastname,
      company: lead.company,
      hs_lead_status: "NEW",
      lifecyclestage: "lead",
    } as Record<string, string>,
    noteBody,
  };
}

async function hubspotFetch(
  token: string,
  url: string,
  init: RequestInit
): Promise<{ ok: boolean; status: number; data: any; text: string }> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init.headers || {}),
    },
  });
  const text = await response.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  return { ok: response.ok, status: response.status, data, text };
}

async function findContactIdByEmail(token: string, email: string): Promise<string | null> {
  const result = await hubspotFetch(
    token,
    "https://api.hubapi.com/crm/v3/objects/contacts/search",
    {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: "email",
                operator: "EQ",
                value: email,
              },
            ],
          },
        ],
        properties: ["email"],
        limit: 1,
      }),
    }
  );

  if (!result.ok) return null;
  const id = result.data?.results?.[0]?.id;
  return id ? String(id) : null;
}

async function attachNote(token: string, contactId: string, noteBody: string): Promise<void> {
  if (!noteBody.trim()) return;

  const noteResult = await hubspotFetch(token, "https://api.hubapi.com/crm/v3/objects/notes", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        hs_timestamp: Date.now().toString(),
        hs_note_body: noteBody,
      },
    }),
  });

  if (!noteResult.ok || !noteResult.data?.id) return;

  await hubspotFetch(
    token,
    "https://api.hubapi.com/crm/v4/objects/notes/" +
      encodeURIComponent(noteResult.data.id) +
      "/associations/contacts/" +
      encodeURIComponent(contactId),
    {
      method: "PUT",
      body: JSON.stringify([
        {
          associationCategory: "HUBSPOT_DEFINED",
          associationTypeId: 202, // note_to_contact
        },
      ]),
    }
  );
}

/**
 * Sync a lead to HubSpot Contacts.
 * Without a token: dry-run success (local/preview without secrets).
 */
export async function syncLeadToHubSpot(
  body: HubSpotLeadInput,
  token: string | undefined
): Promise<{ status: number; result: HubSpotSyncResult }> {
  const lead = normalizeLeadBody(body);
  if (!lead) {
    return {
      status: 400,
      result: {
        success: false,
        message: "Email is required for HubSpot contact creation",
        error: "Email is required for HubSpot contact creation",
      },
    };
  }

  const { properties, noteBody } = buildContactProperties(lead);
  const payloadSent = { properties, noteBody };

  if (!token) {
    return {
      status: 200,
      result: {
        success: true,
        dryRun: true,
        message:
          "Lead captured in dry-run mode. Set HUBSPOT_ACCESS_TOKEN on Vercel to enable live CRM sync.",
        payloadSent,
      },
    };
  }

  try {
    let contactId: string | null = null;
    let rawResponse: unknown = null;

    const createResult = await hubspotFetch(token, HUBSPOT_CONTACTS_URL, {
      method: "POST",
      body: JSON.stringify({ properties }),
    });

    if (createResult.ok && createResult.data?.id) {
      contactId = String(createResult.data.id);
      rawResponse = createResult.data;
    } else if (createResult.status === 409) {
      // Contact already exists — find and update
      contactId = await findContactIdByEmail(token, lead.email);
      if (contactId) {
        const updateResult = await hubspotFetch(
          token,
          `${HUBSPOT_CONTACTS_URL}/${encodeURIComponent(contactId)}`,
          {
            method: "PATCH",
            body: JSON.stringify({ properties }),
          }
        );
        rawResponse = updateResult.data;
        if (!updateResult.ok) {
          return {
            status: updateResult.status,
            result: {
              success: false,
              message: `HubSpot update failed (${updateResult.status})`,
              error: `HubSpot API returned status ${updateResult.status}`,
              details: updateResult.data || updateResult.text,
              payloadSent,
            },
          };
        }
      } else {
        return {
          status: 409,
          result: {
            success: false,
            message: "Contact exists in HubSpot but could not be resolved by email",
            error: "Contact conflict could not be resolved",
            details: createResult.data || createResult.text,
            payloadSent,
          },
        };
      }
    } else {
      return {
        status: createResult.status || 502,
        result: {
          success: false,
          message: `HubSpot API returned status ${createResult.status}`,
          error: `HubSpot API returned status ${createResult.status}`,
          details: createResult.data || createResult.text,
          payloadSent,
        },
      };
    }

    if (contactId) {
      try {
        await attachNote(token, contactId, noteBody);
      } catch {
        // Note attachment is best-effort; contact sync still counts as success
      }
    }

    return {
      status: 200,
      result: {
        success: true,
        dryRun: false,
        contactId: contactId || undefined,
        message: "Contact successfully synchronized on HubSpot portal.",
        payloadSent,
        rawResponse,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      result: {
        success: false,
        message: "Failed to connect to HubSpot servers.",
        error: "Failed to connect to HubSpot servers.",
        details: error?.message || String(error),
        payloadSent,
      },
    };
  }
}

export function hubspotStatusPayload(token: string | undefined) {
  const isConfigured = !!token;
  return {
    connected: isConfigured,
    hasToken: isConfigured,
    status: isConfigured ? "ok" : "missing_token",
    message: isConfigured
      ? "HubSpot CRM is configured and live on this corridor application."
      : "HubSpot token not found. Dry-run fallback mode is active until HUBSPOT_ACCESS_TOKEN is set on Vercel.",
    apiEndpoint: HUBSPOT_CONTACTS_URL,
  };
}
