# AGENTS.md — feed-manager-ui

## Project identity

- **Repo**: `Babesky-com/feed-manager-ui` (private, pre-OSS)
- **Stack**: SvelteKit 2, Svelte 5 runes, TypeScript strict, Vite
- **Related**: `Babesky-com/feedgen` (the feed platform this UI proxies to)

## Architecture

**Proxy-based, thin UI.** This app has no database, no auth layer, no secrets. Every `/api/*` route forwards to `${FEEDGEN_ADMIN_URL}/admin/*`, passing through the browser's session cookies. Feedgen handles all state, auth, and data.

The shared proxy helper lives at `src/lib/server/admin-proxy.ts` — all server routes import from it. New API endpoints should use this helper rather than making direct fetch calls.

The full admin API contract is at `docs/ADMIN_API_CONTRACT.md` — read it before adding any new proxy endpoint.

## Dev workflow

- Use `npm` as package manager (`package-lock.json` is committed)
- Run `npm run check` before pushing (svelte-check for type-checking)
- Feature branches from `main`, PRs into `main`
- Commit format: `feat|fix|chore: description (closes #N)`

## Environment

The only required env var is `FEEDGEN_ADMIN_URL` — set it in `.env` (copy from `.env.example`). All other config surfaces are on the feedgen side.

When working on the UI without a live feedgen, you can use the `FEEDGEN_ADMIN_BEARER_TOKEN` env var with a hardcoded token for local/CI testing. In production, leave it empty and session passthrough handles auth automatically.

## Code patterns

- **Server routes**: Import `proxyToAdmin()` or `fetchAdmin<T>()` from `$lib/server/admin-proxy`, route the call, return the response. Keep routes thin — all logic lives in the proxy helper.
- **Pages**: Use Svelte 5 runes (`$state`, `$derived`, `$effect`). Fetch from `/api/*` endpoints (not direct to feedgen). Handle loading, error, and empty states.
- **Types**: Define response types inline in the page/component (not in a shared types file yet — this may change as the app grows).
- **Styling**: Scoped `<style>` blocks in each component. No Tailwind, no shadcn — CSS custom properties for theming (dark theme).
