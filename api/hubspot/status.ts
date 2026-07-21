import { hubspotStatusPayload } from "../../lib/hubspotContact.js";
import { isHubSpotSandboxAuthorized } from "../../lib/leads/env.js";

export const config = {
  runtime: "nodejs",
};

/**
 * GET /api/hubspot/status
 * Legacy Contacts sandbox — not a public CRM probe in production.
 */
export function GET(request: Request) {
  if (!isHubSpotSandboxAuthorized(request.headers)) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }

  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  return Response.json(hubspotStatusPayload(token));
}
