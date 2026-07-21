# Error handling & 404 architecture

## Previous behaviour

- Unknown paths returned Vercel’s plain-text `NOT_FOUND` page with **HTTP 404**.
- No branded recovery experience.
- No React error boundary (a render crash could blank the page).
- Navigation was mostly non-crawlable `<button>` scroll handlers.
- LinkedIn used `rel="noreferrer"` only (missing `noopener`) and a non-`www` host.

## Current architecture

This site is a **single public page** (homepage sections + interactive tools). There is **no React Router** and **no multi-page client routes**.

### True HTTP 404 (preferred path)

1. **No SPA catch-all rewrite** is configured (no `vercel.json` rewrites to `index.html`).
2. Unknown paths such as `/projects/unknown` are handled by Vercel as real **404** responses.
3. `public/404.html` is copied into the production output and serves as the branded not-found document while preserving **HTTP 404**.
4. The static 404 page:
   - Matches site brand (colours, fonts, buttons)
   - Sets `noindex, follow`
   - Uses route-aware messaging for project / insight / advisory style paths
   - Offers recovery links to homepage, `#ecosystem-engagement`, and email

### Client-side defensive fallback (soft 404 only if SPA shell is served)

`src/components/NotFoundPage.tsx` renders when the React app loads on a non-home pathname. That is a **soft 404 (HTTP 200)** scenario and only happens if:

- local `vite preview` / dev middleware serves `index.html` for unknown paths, or
- a future rewrite accidentally routes unknown paths into the SPA

Production Vercel currently does **not** rewrite unknown paths into the SPA, so visitors should see the static `404.html` with a real 404 status.

### React error boundary

`src/components/ErrorBoundary.tsx` wraps the app in `main.tsx`. Unexpected render failures show a branded recovery screen without stack traces in production.

## Soft-404 limitation

If SPA rewrites are ever added (e.g. `"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]`), unknown URLs will return **HTTP 200** and rely on the client `NotFoundPage`. Avoid that configuration unless multi-page client routing is intentionally introduced.

## Link policy

- Homepage section navigation uses crawlable `#` anchors where practical.
- External links that open in a new tab use `rel="noopener noreferrer"`.
- Run `npm run check:links` for internal audits; add `--external` for outbound checks.
