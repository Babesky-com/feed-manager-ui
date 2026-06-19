# feed-manager-ui

> A self-hostable admin dashboard for managing multiple Bluesky feed generators.
> Inspired by Ozone (the labeler management UI) — but for feed engines.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Feed generators are the backbone of the AT Protocol's discovery layer, but there's no standard way to *manage* them at scale. This project fills that gap — a web UI where you can monitor, configure, and operate one or more feed generator instances from a single dashboard.

## Vision

Just as **Ozone** gives labeler operators a management UI (moderation queues, label definitions, team controls), **feed-manager-ui** gives feed operators:

- **Multi-feed dashboard** — see all your feed generators in one place
- **Per-feed metrics** — DAU, request volume, cache hit rates, latency
- **Feed preview** — inspect what posts a feed would return for any viewer, with per-post scoring reasons
- **Feature flags & config** — toggle algos, adjust parameters, update env without redeploy
- **Approved-set management** — curate author lists, moderation rules
- **Health monitoring** — subscription lag, errors, backfill status
- **Per-post reasoning** — understand *why* a post appeared in a viewer's feed

## Status

**Public — early development.** The admin UI connects to a running [`Babesky-com/feedgen`](https://github.com/Babesky-com/feedgen) instance. This repo is a standalone, general-purpose tool that can manage any feedgen deployment.

Current pages:

- **Landing** — project overview with links to dashboard and feedgen repo
- **Dashboard** (`/dashboard`) — aggregate stats (unique viewers, requests, impressions, engagements), DAU bar chart, registered feeds list
- **Feed Preview** (`/dashboard/feed-preview`) — run the feed algorithm for any viewer and see ranked posts with per-post scoring reasons

## Architecture

The UI is a **proxy-based SvelteKit app**. It does not have its own database or authentication. Instead:

1. The operator points `FEEDGEN_ADMIN_URL` at their feedgen instance.
2. The UI server proxies all `/api/*` requests to feedgen's `/admin/*` endpoints, forwarding the browser's session cookies.
3. Feedgen handles authentication (ATProto OAuth or app-password), and the UI just passes the session through.

This keeps the UI thin — zero state, zero auth, zero duplication. The full admin API contract is documented at [`docs/ADMIN_API_CONTRACT.md`](docs/ADMIN_API_CONTRACT.md).

```
Browser ──→ feed-manager-ui (SvelteKit) ──→ feedgen /admin/* (Express)
             │                                │
             │  FEEDGEN_ADMIN_URL             │  ATProto OAuth
             │  session passthrough           │  SQLite + Redis
```

## Stack

- **SvelteKit 2** + **Svelte 5 runes** — reactive UI framework
- **TypeScript** — strict mode
- **Vite** — dev server and build
- No database, no auth — all state lives in feedgen

## Quick Start

```bash
git clone git@github.com:Babesky-com/feed-manager-ui.git
cd feed-manager-ui
npm install

# Create your .env file
cp .env.example .env
# Edit .env: set FEEDGEN_ADMIN_URL to your feedgen instance

npm run dev -- --open
```

Visit `http://localhost:5173` — the dashboard will proxy requests to your feedgen instance.

If feedgen is unreachable, the dashboard shows a clear error banner with setup guidance.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `FEEDGEN_ADMIN_URL` | `http://localhost:3000` | Base URL of the feedgen instance (without `/admin`). The UI proxies all `/api/*` calls to this host's `/admin/*` routes. |
| `FEEDGEN_ADMIN_BEARER_TOKEN` | (empty) | Optional static Bearer token for machine-to-machine auth. When set, all proxied requests use this token instead of forwarding the browser's session cookies. |

## Commands

```bash
npm run dev         # Start dev server (with hot reload)
npm run build       # Production build
npm run preview     # Preview production build
npm run check       # Type-check with svelte-check
```

## Project Structure

```
src/
├── lib/
│   └── server/
│       └── admin-proxy.ts    # Shared proxy helper for all admin API calls
├── routes/
│   ├── +layout.svelte        # App shell (nav, footer)
│   ├── +page.svelte          # Landing page
│   ├── dashboard/
│   │   ├── +page.svelte      # Dashboard overview (stats + charts)
│   │   └── feed-preview/
│   │       └── +page.svelte  # Feed preview with per-post scoring reasons
│   └── api/
│       ├── stats/+server.ts  # → feedgen /admin/stats
│       ├── feeds/+server.ts  # → feedgen /admin/feed-daily-metrics-summary
│       └── proxy/[...path]/  # Catch-all → feedgen /admin/<path>
docs/
└── ADMIN_API_CONTRACT.md     # Full feedgen admin API reference
```

## Related

- [`Babesky-com/feedgen`](https://github.com/Babesky-com/feedgen) — the feed generator platform this UI manages *(currently private — public launch TBD)*
- [`Babesky-com/personalization-engine`](https://github.com/Babesky-com/personalization-engine) — the ranking/scoring engine that powers the algos *(currently private — public launch TBD)*
- [Ozone](https://github.com/bluesky-social/ozone) — the inspiration: a management UI for labelers

## License

MIT
