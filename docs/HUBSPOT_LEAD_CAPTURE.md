# HubSpot website lead capture

## Architecture

```
Native React form
  → POST /api/leads/submit  (Vercel serverless / local Express)
  → validation + abuse checks
  → HubSpot Forms API
     https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
```

Ordinary website leads **do not** use the Contacts private-app token.
Form IDs and portal ID stay **server-side** (`HUBSPOT_*` without `VITE_`).

Legacy `/api/hubspot/*` remains for the Growth hub sandbox only.

## Lead types → env form IDs

| leadType     | Env var                         | Recommended HubSpot form name              |
|--------------|----------------------------------|--------------------------------------------|
| advisory     | `HUBSPOT_FORM_ID_ADVISORY`       | JM Website — Advisory Enquiry              |
| booking      | `HUBSPOT_FORM_ID_BOOKING`        | JM Website — Strategy Call                 |
| assessment   | `HUBSPOT_FORM_ID_ASSESSMENT`     | JM Website — Assessment Results            |
| partnership  | `HUBSPOT_FORM_ID_PARTNERSHIP`    | JM Website — Partnership Enquiry           |

Portal: `HUBSPOT_PORTAL_ID`

## Custom contact properties (create in HubSpot)

| Label | Internal name | Object | Type | Used by |
|-------|---------------|--------|------|---------|
| Website Lead Type | `website_lead_type` | Contact | Single-line text or select | all |
| Service Interest | `service_interest` | Contact | Single-line text or select | advisory, booking, assessment, partnership |
| Lead Source Detail | `lead_source_detail` | Contact | Single-line text | all |
| Primary Challenge | `primary_challenge` | Contact | Multi-line text | advisory, booking |
| Tool Used | `tool_used` | Contact | Single-line text | assessment |
| Assessment Score | `assessment_score` | Contact | Single-line text | assessment |
| Preferred Meeting Date | `preferred_meeting_date` | Contact | Single-line text / date | booking |
| Preferred Meeting Time | `preferred_meeting_time` | Contact | Single-line text | booking |
| Landing Page | `landing_page` | Contact | Single-line text | all |
| Original Page URL | `original_page_url` | Contact | Single-line text | all |
| UTM Source | `utm_source` | Contact | Single-line text | all when present |
| UTM Medium | `utm_medium` | Contact | Single-line text | all when present |
| UTM Campaign | `utm_campaign` | Contact | Single-line text | all when present |
| UTM Term | `utm_term` | Contact | Single-line text | all when present |
| UTM Content | `utm_content` | Contact | Single-line text | all when present |

Also map standard fields on each form: `firstname`, `lastname`, `email`, `company`, `website`, `message`.

**Each HubSpot form must include every property the server sends for that lead type**, or HubSpot may return 400.

## Recommended lists / views

- New Website Leads
- Advisory Leads
- Strategy Call Requests
- Assessment Leads
- Partnership Leads
- Uncontacted Leads

Minimal process: New → Contacted → Qualified → Meeting Scheduled → Not a Fit  
(Use contact lifecycle / lead status available on your plan.)

## Consent

Enquiry forms process data to **respond to the request** only.  
No pre-checked marketing opt-in.  
**Owner review required** for final privacy wording.

## Tracking code

Optional public script id via `VITE_HUBSPOT_TRACKING_CODE_ID` (production client only).  
Dashboard:

1. Copy tracking code / portal ID  
2. Add `www.jimmymanalel.com` as external site  
3. Verify installation  
4. Configure cookie banner  
5. Exclude internal traffic  
6. Confirm sessions in Analytics  

## Rate limiting

In-memory per serverless isolate (≈ 8 req / minute / IP+leadType).  
Not globally durable — upgrade to KV/Upstash if abuse appears.

## Dry-run vs fail-closed

| Runtime | Missing portal/form IDs |
|---------|-------------------------|
| **development** | `200` + `success: true` + `dryRun: true` (explicit: no HubSpot write) |
| **preview** | Dry-run only if `HUBSPOT_ALLOW_DRY_RUN=true`; else `503` + `lead_service_unavailable` |
| **production** | Always `503` + `lead_service_unavailable` — **never** a false success |

## Legacy Contacts sandbox (`/api/hubspot/*`)

- **development**: open for local Growth hub tooling  
- **preview/production**: requires `HUBSPOT_SANDBOX_SECRET` via `x-jm-sandbox-key` (or Bearer). Without secret → **404**  
- Private app token never shipped to the browser  

## Tracking consent

HubSpot tracking script does **not** load unless:

1. Production build  
2. `VITE_HUBSPOT_TRACKING_ENABLED=true`  
3. `VITE_HUBSPOT_TRACKING_CODE_ID` is set  
4. `localStorage.jm_hs_analytics_consent === "granted"` (set by an approved consent UI)  

Form submissions do not depend on tracking cookies.
