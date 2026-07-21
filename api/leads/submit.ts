import { processLeadSubmission } from "../../lib/leads/processLead.js";

export const config = {
  runtime: "nodejs",
};

function clientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || undefined;
  }
  return request.headers.get("x-real-ip") || undefined;
}

/**
 * POST /api/leads/submit
 * Native website lead capture → HubSpot Forms submission API (server-side).
 */
export async function POST(request: Request) {
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const result = await processLeadSubmission(body, {
    ip: clientIp(request),
    userAgent: request.headers.get("user-agent") || undefined,
  });

  return Response.json(result.body, { status: result.status });
}

export function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
