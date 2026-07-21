#!/usr/bin/env node
/**
 * Lead pipeline unit tests (no real HubSpot credentials required).
 */
import assert from "node:assert/strict";
import { validateLeadSubmission } from "../lib/leads/validate.ts";
import { checkRateLimit, _resetRateLimitsForTests } from "../lib/leads/rateLimit.ts";
import { processLeadSubmission } from "../lib/leads/processLead.ts";
import { isDryRunAllowed, isHubSpotSandboxAuthorized, getRuntimeEnv } from "../lib/leads/env.ts";
import { submitToHubSpotForm } from "../lib/leads/hubspotForms.ts";

const now = Date.now();
const started = now - 5000;

function base(overrides = {}) {
  return {
    formStartedAt: started,
    companyFax: "",
    firstname: "Ada",
    email: "ada@example.com",
    ...overrides,
  };
}

function advisoryPayload() {
  return base({
    leadType: "advisory",
    company: "Co",
    serviceInterest: "Founder Strategic Advisory",
    message: "Need help with corridor entry",
  });
}

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    console.error(`  ✗ ${name}`);
    throw error;
  }
}

async function testAsync(name, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    console.error(`  ✗ ${name}`);
    throw error;
  }
}

console.log("\nLead validation & process tests\n-------------------------------");

// --- core validation ---
test("valid advisory", () => {
  const r = validateLeadSubmission(
    base({
      leadType: "advisory",
      company: "Example Co",
      serviceInterest: "Founder Strategic Advisory",
      message: "Need GCC pathway help",
    }),
    { now }
  );
  assert.equal(r.ok, true);
});

test("valid booking", () => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + 1);
  while (d.getUTCDay() === 0 || d.getUTCDay() === 6) d.setUTCDate(d.getUTCDate() + 1);
  const iso = d.toISOString().slice(0, 10);
  const r = validateLeadSubmission(
    base({
      leadType: "booking",
      company: "Example Co",
      preferredMeetingDate: iso,
      preferredMeetingTime: "10:00 AM GST",
      message: "Discuss narrative",
      serviceInterest: "Investor Narrative Architecture",
    }),
    { now }
  );
  assert.equal(r.ok, true);
});

test("valid assessment", () => {
  const r = validateLeadSubmission(
    base({
      leadType: "assessment",
      toolUsed: "Narrative Diagnostic Grader",
      assessmentScore: 76,
      assessmentSummary: "Solid early narrative",
    }),
    { now }
  );
  assert.equal(r.ok, true);
});

test("valid partnership", () => {
  const r = validateLeadSubmission(
    base({
      leadType: "partnership",
      company: "Ecosystem Org",
      partnershipType: "Speaking request",
      message: "Invite to panel",
    }),
    { now }
  );
  assert.equal(r.ok, true);
});

test("unknown lead type", () => {
  const r = validateLeadSubmission(base({ leadType: "spam" }), { now });
  assert.equal(r.ok, false);
});

test("invalid email", () => {
  const r = validateLeadSubmission(
    base({
      leadType: "advisory",
      email: "not-an-email",
      company: "Co",
      serviceInterest: "Founder Strategic Advisory",
      message: "Hello",
    }),
    { now }
  );
  assert.equal(r.ok, false);
  assert.ok(r.errors.email);
});

test("missing required field", () => {
  const r = validateLeadSubmission(
    base({
      leadType: "advisory",
      company: "",
      serviceInterest: "Founder Strategic Advisory",
      message: "Hello",
    }),
    { now }
  );
  assert.equal(r.ok, false);
});

test("honeypot triggered", () => {
  const r = validateLeadSubmission(
    base({
      leadType: "advisory",
      company: "Co",
      serviceInterest: "Founder Strategic Advisory",
      message: "Hello",
      companyFax: "bot",
    }),
    { now }
  );
  assert.equal(r.ok, false);
});

test("rate limit triggers", () => {
  _resetRateLimitsForTests();
  for (let i = 0; i < 8; i++) assert.equal(checkRateLimit("t:advisory").allowed, true);
  assert.equal(checkRateLimit("t:advisory").allowed, false);
});

// --- dry-run / fail-closed ---
await testAsync("development dry-run when config missing", async () => {
  const prev = { ...process.env };
  process.env.NODE_ENV = "development";
  delete process.env.VERCEL_ENV;
  delete process.env.HUBSPOT_PORTAL_ID;
  delete process.env.HUBSPOT_FORM_ID_ADVISORY;
  delete process.env.HUBSPOT_ALLOW_DRY_RUN;

  assert.equal(getRuntimeEnv(), "development");
  assert.equal(isDryRunAllowed(), true);

  const result = await processLeadSubmission(advisoryPayload(), { ip: "127.0.0.1" });
  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
  assert.equal(result.body.dryRun, true);
  assert.match(result.body.message, /Dry-run only|no HubSpot submission/i);

  process.env = prev;
});

await testAsync("preview dry-run only when HUBSPOT_ALLOW_DRY_RUN=true", async () => {
  const prev = { ...process.env };
  process.env.VERCEL_ENV = "preview";
  delete process.env.HUBSPOT_PORTAL_ID;
  delete process.env.HUBSPOT_FORM_ID_ADVISORY;

  process.env.HUBSPOT_ALLOW_DRY_RUN = "true";
  assert.equal(isDryRunAllowed(), true);
  let result = await processLeadSubmission(advisoryPayload(), { ip: "10.0.0.8" });
  assert.equal(result.status, 200);
  assert.equal(result.body.dryRun, true);

  process.env.HUBSPOT_ALLOW_DRY_RUN = "false";
  assert.equal(isDryRunAllowed(), false);
  result = await processLeadSubmission(advisoryPayload(), { ip: "10.0.0.9" });
  assert.equal(result.status, 503);
  assert.equal(result.body.success, false);
  assert.equal(result.body.code, "lead_service_unavailable");

  process.env = prev;
});

await testAsync("production missing portal ID returns 503", async () => {
  const prev = { ...process.env };
  process.env.VERCEL_ENV = "production";
  delete process.env.HUBSPOT_PORTAL_ID;
  process.env.HUBSPOT_FORM_ID_ADVISORY = "form-guid";
  delete process.env.HUBSPOT_ALLOW_DRY_RUN;

  assert.equal(isDryRunAllowed(), false);
  const result = await processLeadSubmission(advisoryPayload(), { ip: "10.1.1.1" });
  assert.equal(result.status, 503);
  assert.equal(result.body.success, false);
  assert.equal(result.body.code, "lead_service_unavailable");
  assert.equal(result.body.dryRun, undefined);

  process.env = prev;
});

await testAsync("production missing form ID returns 503", async () => {
  const prev = { ...process.env };
  process.env.VERCEL_ENV = "production";
  process.env.HUBSPOT_PORTAL_ID = "123456";
  delete process.env.HUBSPOT_FORM_ID_ADVISORY;

  const result = await processLeadSubmission(advisoryPayload(), { ip: "10.1.1.2" });
  assert.equal(result.status, 503);
  assert.equal(result.body.success, false);
  assert.equal(result.body.code, "lead_service_unavailable");

  process.env = prev;
});

await testAsync("production never succeeds without HubSpot acceptance (config missing)", async () => {
  const prev = { ...process.env };
  process.env.VERCEL_ENV = "production";
  delete process.env.HUBSPOT_PORTAL_ID;
  delete process.env.HUBSPOT_FORM_ID_ADVISORY;

  const validated = validateLeadSubmission(advisoryPayload(), { now });
  assert.equal(validated.ok, true);
  const submitted = await submitToHubSpotForm(validated.data);
  assert.notEqual(submitted.status, 200);
  assert.equal(submitted.body.success, false);
  assert.equal(submitted.body.dryRun, undefined);

  process.env = prev;
});

await testAsync("processLead rejects unknown type", async () => {
  const result = await processLeadSubmission(base({ leadType: "nope" }), { ip: "10.0.0.2" });
  assert.equal(result.status, 400);
  assert.equal(result.body.success, false);
});

// --- sandbox protection ---
test("sandbox open in development", () => {
  const prev = { ...process.env };
  delete process.env.VERCEL_ENV;
  process.env.NODE_ENV = "development";
  assert.equal(
    isHubSpotSandboxAuthorized({ get: () => null }),
    true
  );
  process.env = prev;
});

test("sandbox closed in production without secret", () => {
  const prev = { ...process.env };
  process.env.VERCEL_ENV = "production";
  delete process.env.HUBSPOT_SANDBOX_SECRET;
  assert.equal(
    isHubSpotSandboxAuthorized({ get: () => null }),
    false
  );
  process.env = prev;
});

test("sandbox denied in production even with matching header", () => {
  const prev = { ...process.env };
  process.env.VERCEL_ENV = "production";
  process.env.HUBSPOT_SANDBOX_SECRET = "test-secret-key";
  assert.equal(
    isHubSpotSandboxAuthorized({
      get: (n) => (n.toLowerCase() === "x-jm-sandbox-key" ? "test-secret-key" : null),
    }),
    false
  );
  process.env = prev;
});

test("sandbox allowed in preview with matching header", () => {
  const prev = { ...process.env };
  process.env.VERCEL_ENV = "preview";
  process.env.HUBSPOT_SANDBOX_SECRET = "test-secret-key";
  assert.equal(
    isHubSpotSandboxAuthorized({
      get: (n) => (n.toLowerCase() === "x-jm-sandbox-key" ? "test-secret-key" : null),
    }),
    true
  );
  assert.equal(
    isHubSpotSandboxAuthorized({
      get: (n) => (n.toLowerCase() === "x-jm-sandbox-key" ? "wrong" : null),
    }),
    false
  );
  process.env = prev;
});

console.log(`\nResult: ${passed} tests passed\n`);
