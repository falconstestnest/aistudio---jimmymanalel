import { syncLeadToHubSpot, type HubSpotLeadInput } from "../../lib/hubspotContact.js";
import { isHubSpotSandboxAuthorized } from "../../lib/leads/env.js";

export const config = {
  runtime: "nodejs",
};

/**
 * POST /api/hubspot/sync
 * Legacy Contacts API sandbox — disabled for anonymous production traffic.
 */
export async function POST(request: Request) {
  if (!isHubSpotSandboxAuthorized(request.headers)) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }

  let body: HubSpotLeadInput = {};
  try {
    body = (await request.json()) as HubSpotLeadInput;
  } catch {
    body = {};
  }

  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  const { status, result } = await syncLeadToHubSpot(body, token);
  return Response.json(result, { status });
}
