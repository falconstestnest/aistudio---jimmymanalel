/**
 * Runtime environment helpers for lead capture & sandbox protection.
 * Uses Vercel-standard VERCEL_ENV when present.
 */

export type RuntimeEnv = "production" | "preview" | "development";

export function getRuntimeEnv(): RuntimeEnv {
  const vercel = (process.env.VERCEL_ENV || "").toLowerCase();
  if (vercel === "production" || vercel === "preview" || vercel === "development") {
    return vercel;
  }
  // Local Express / unit tests
  if ((process.env.NODE_ENV || "").toLowerCase() === "production") {
    return "production";
  }
  return "development";
}

/** Whether dry-run (no HubSpot network write) is permitted. */
export function isDryRunAllowed(): boolean {
  const env = getRuntimeEnv();
  if (env === "production") return false;
  if (env === "development") return true;
  // preview: only when explicitly opted in
  return (process.env.HUBSPOT_ALLOW_DRY_RUN || "").toLowerCase() === "true";
}

export function leadConfigPresence() {
  return {
    portalId: Boolean(process.env.HUBSPOT_PORTAL_ID?.trim()),
    formAdvisory: Boolean(process.env.HUBSPOT_FORM_ID_ADVISORY?.trim()),
    formBooking: Boolean(process.env.HUBSPOT_FORM_ID_BOOKING?.trim()),
    formAssessment: Boolean(process.env.HUBSPOT_FORM_ID_ASSESSMENT?.trim()),
    formPartnership: Boolean(process.env.HUBSPOT_FORM_ID_PARTNERSHIP?.trim()),
    runtime: getRuntimeEnv(),
    dryRunAllowed: isDryRunAllowed(),
  };
}

let loggedConfig = false;

/** One-time redacted config log for deploy/runtime diagnostics (no values). */
export function logLeadConfigOnce(): void {
  if (loggedConfig) return;
  loggedConfig = true;
  const p = leadConfigPresence();
  console.info("[leads] HubSpot form configuration presence", p);
}

/**
 * Legacy Contacts sandbox (/api/hubspot/*).
 *
 * Production: always denied (preferred fail-closed — no public CRM write/read).
 * Preview: requires HUBSPOT_SANDBOX_SECRET header match.
 * Development: open for local tooling only.
 */
export function isHubSpotSandboxAuthorized(headers: {
  get(name: string): string | null;
}): boolean {
  const env = getRuntimeEnv();

  // Preferred production solution: disable entirely — no secret bypass.
  if (env === "production") {
    return false;
  }

  if (env === "development") {
    return true;
  }

  // preview
  const secret = process.env.HUBSPOT_SANDBOX_SECRET?.trim();
  if (!secret) {
    return false;
  }

  const key =
    headers.get("x-jm-sandbox-key") ||
    headers.get("X-JM-Sandbox-Key") ||
    extractBearer(headers.get("authorization") || headers.get("Authorization"));

  return Boolean(key && key === secret);
}

function extractBearer(value: string | null): string | null {
  if (!value) return null;
  const m = value.match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : null;
}
