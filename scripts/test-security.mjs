#!/usr/bin/env node
/**
 * Public exposure / HubSpot sandbox security checks.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isHubSpotSandboxAuthorized } from "../lib/leads/env.ts";
import { processLeadSubmission } from "../lib/leads/processLead.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    console.error(`  ✗ ${name}`);
    throw e;
  }
}
async function testAsync(name, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    console.error(`  ✗ ${name}`);
    throw e;
  }
}

console.log("\nSecurity exposure tests\n-----------------------");

test("GrowthMarketingHub is not imported by public pages/router", () => {
  for (const rel of ["src/router.tsx", "src/pages/HomePage.tsx", "src/App.tsx"]) {
    const app = fs.readFileSync(path.join(root, rel), "utf8");
    assert.ok(!app.includes("GrowthMarketingHub"), rel);
    assert.ok(!app.includes("Growth & Leads"), rel);
    assert.ok(!app.includes("tab-select-growth"), rel);
    assert.ok(!app.includes('activeTab === "growth"'), rel);
  }
});

test("Visitor lead forms live on public routes, not CRM sandbox copy", () => {
  const advisory = fs.readFileSync(path.join(root, "src/pages/AdvisoryPage.tsx"), "utf8");
  const partnerships = fs.readFileSync(
    path.join(root, "src/pages/PartnershipsPage.tsx"),
    "utf8"
  );
  const strategy = fs.readFileSync(
    path.join(root, "src/pages/StrategyConversationPage.tsx"),
    "utf8"
  );
  const router = fs.readFileSync(path.join(root, "src/router.tsx"), "utf8");
  assert.ok(advisory.includes("AdvisoryEnquiryForm"));
  assert.ok(partnerships.includes("PartnershipEnquiryForm"));
  assert.ok(strategy.includes("BookingForm"));
  assert.ok(router.includes("AdvisoryPage"));
  assert.ok(router.includes("PartnershipsPage"));
  assert.ok(router.includes("StrategyConversationPage"));
  for (const text of [advisory, partnerships, strategy, router]) {
    assert.ok(!text.includes("Dispatch HubSpot"));
    assert.ok(!text.includes("CRM Payload Sandbox"));
  }
});

test("production sandbox always denied (even with secret)", () => {
  const prev = { ...process.env };
  process.env.VERCEL_ENV = "production";
  process.env.HUBSPOT_SANDBOX_SECRET = "even-if-set";
  assert.equal(
    isHubSpotSandboxAuthorized({
      get: (n) => (n.toLowerCase() === "x-jm-sandbox-key" ? "even-if-set" : null),
    }),
    false
  );
  process.env = prev;
});

test("preview sandbox denied without secret", () => {
  const prev = { ...process.env };
  process.env.VERCEL_ENV = "preview";
  delete process.env.HUBSPOT_SANDBOX_SECRET;
  assert.equal(isHubSpotSandboxAuthorized({ get: () => null }), false);
  process.env = prev;
});

test("development sandbox allowed for local tooling", () => {
  const prev = { ...process.env };
  delete process.env.VERCEL_ENV;
  process.env.NODE_ENV = "development";
  assert.equal(isHubSpotSandboxAuthorized({ get: () => null }), true);
  process.env = prev;
});

await testAsync("production missing form config fails closed (no success)", async () => {
  const prev = { ...process.env };
  process.env.VERCEL_ENV = "production";
  delete process.env.HUBSPOT_PORTAL_ID;
  delete process.env.HUBSPOT_FORM_ID_ADVISORY;
  const result = await processLeadSubmission(
    {
      formStartedAt: Date.now() - 5000,
      companyFax: "",
      leadType: "advisory",
      firstname: "Ada",
      email: "ada@example.com",
      company: "Co",
      serviceInterest: "Founder Strategic Advisory",
      message: "Need help",
    },
    { ip: "203.0.113.10" }
  );
  assert.equal(result.status, 503);
  assert.equal(result.body.success, false);
  assert.equal(result.body.code, "lead_service_unavailable");
  process.env = prev;
});

await testAsync("leads submit path still validates and accepts dry-run in development", async () => {
  const prev = { ...process.env };
  delete process.env.VERCEL_ENV;
  process.env.NODE_ENV = "development";
  delete process.env.HUBSPOT_PORTAL_ID;
  delete process.env.HUBSPOT_FORM_ID_ADVISORY;
  const result = await processLeadSubmission(
    {
      formStartedAt: Date.now() - 5000,
      companyFax: "",
      leadType: "advisory",
      firstname: "Ada",
      email: "ada@example.com",
      company: "Co",
      serviceInterest: "Founder Strategic Advisory",
      message: "Need help",
    },
    { ip: "127.0.0.1" }
  );
  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
  assert.equal(result.body.dryRun, true);
  process.env = prev;
});

test("dist has no Growth hub or private token markers when present", () => {
  const distIndex = path.join(root, "dist/index.html");
  if (!fs.existsSync(distIndex)) {
    console.log("  · skip dist checks (run build first)");
    return;
  }
  const html = fs.readFileSync(distIndex, "utf8");
  const forbidden = [
    "Growth & Lead Hub",
    "CRM Payload Sandbox",
    "Dispatch HubSpot API Call",
    "Google Ads Conversion Track Gateway",
    "Connected & Active",
    "HUBSPOT_ACCESS_TOKEN",
    "pixel_conversion",
    "tab-select-growth",
  ];
  for (const f of forbidden) {
    assert.ok(!html.includes(f), `dist/index.html must not contain: ${f}`);
  }
  assert.ok(!/pat-na[12]-[0-9a-f-]{10,}/i.test(html), "no pat token in index");

  const assetsDir = path.join(root, "dist/assets");
  if (fs.existsSync(assetsDir)) {
    for (const file of fs.readdirSync(assetsDir)) {
      if (!/\.(js|map|css)$/i.test(file)) continue;
      const text = fs.readFileSync(path.join(assetsDir, file), "utf8");
      assert.ok(!/pat-na[12]-[0-9a-f-]{20,}/i.test(text), `no pat token in ${file}`);
      // Visitor-configurable AW- storage UI must not ship
      assert.ok(!text.includes("Store Conversion ID"), `no ads config UI in ${file}`);
      assert.ok(!text.includes("Trigger Simulated pixel_conversion"), `no pixel sandbox in ${file}`);
    }
  }
});

test("GrowthMarketingHub file is DEV-gated", () => {
  const src = fs.readFileSync(path.join(root, "src/components/GrowthMarketingHub.tsx"), "utf8");
  assert.ok(src.includes("import.meta.env.DEV"));
  assert.ok(src.includes("return null"));
});

console.log(`\nResult: ${passed} security tests passed\n`);
