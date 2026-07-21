# HubSpot on Vercel

## Why this exists

Production Vercel deploys this project as a **Vite static site**. The Express `server.ts` HubSpot routes are **not** executed on `www.jimmymanalel.com`.

Live API is provided by Vercel Serverless Functions:

- `GET  /api/hubspot/status` → `api/hubspot/status.ts`
- `POST /api/hubspot/sync`   → `api/hubspot/sync.ts`

Shared logic lives in `lib/hubspotContact.ts` and is also used by local Express (`server.ts`).

## Required environment variable

| Name | Where | Value |
|------|--------|--------|
| `HUBSPOT_ACCESS_TOKEN` | Vercel → Project → Settings → Environment Variables | HubSpot Private App access token |

Enable for **Production** (and Preview if you want dry-run off on previews).

### Private App scopes

- `crm.objects.contacts.read`
- `crm.objects.contacts.write`
- `crm.objects.notes.write` (for submission notes; optional but recommended)
- `crm.objects.notes.read` (optional)

After saving the env var, **redeploy** so functions pick it up.

## Frontend callers (unchanged paths)

- Booking form → `POST /api/hubspot/sync`
- Pitch grader → `POST /api/hubspot/sync`
- Growth & Leads hub → `GET /api/hubspot/status`, `POST /api/hubspot/sync`

Payload shape:

```json
{
  "email": "founder@example.com",
  "firstname": "Ada",
  "lastname": "Lovelace",
  "company": "Example Ventures",
  "message": "Need GCC pathway",
  "source": "Strategic Corridor Booking Form",
  "details": "Optional extra context"
}
```

## Behaviour

| Token present? | Result |
|----------------|--------|
| No | `200` dry-run (`dryRun: true`) — no HubSpot write |
| Yes | Create contact (or update on 409 conflict) + best-effort CRM note |

## Verify after deploy

```bash
curl -sS https://www.jimmymanalel.com/api/hubspot/status

curl -sS -X POST https://www.jimmymanalel.com/api/hubspot/sync \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com","firstname":"Test","lastname":"Lead","company":"Test Co","message":"API verification","source":"manual-curl"}'
```

Expect `connected: true` / `dryRun: false` when the token is set.
