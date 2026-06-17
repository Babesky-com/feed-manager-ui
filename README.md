# feed-manager-ui

> A self-hostable admin dashboard for managing multiple Bluesky feed generators.
> Inspired by Ozone (the labeler management UI) — but for feed engines.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Feed generators are the backbone of the AT Protocol's discovery layer, but there's no standard way to *manage* them at scale. This project fills that gap — a web UI where you can monitor, configure, and operate one or more feed generator instances from a single dashboard.

## Vision

Just as **Ozone** gives labeler operators a management UI (moderation queues, label definitions, team controls), **feed-manager-ui** gives feed operators:

- **Multi-feed dashboard** — see all your feed generators in one place
- **Per-feed metrics** — DAU, request volume, cache hit rates, latency
- **Algorithm preview** — inspect what posts a feed would return for a given viewer
- **Feature flags & config** — toggle algos, adjust parameters, update env without redeploy
- **Approved-set management** — curate author lists, moderation rules
- **Health monitoring** — subscription lag, errors, backfill status
- **Per-post reasoning** — understand *why* a post appeared in a viewer's feed

## Status

**Private/early development.** The initial feed generator platform lives at [`Babesky-com/feedgen`](https://github.com/Babesky-com/feedgen) — this repo extracts the admin UI layer into a standalone, general-purpose tool.

## Stack (planned)

- SvelteKit 2 + TypeScript
- AT Protocol OAuth for operator sign-in
- REST/WebSocket API to feed generator instances
- PostgreSQL for configuration and audit logs

## Related

- [`Babesky-com/feedgen`](https://github.com/Babesky-com/feedgen) — the feed generator platform this UI manages
- [`Babesky-com/personalization-engine`](https://github.com/Babesky-com/personalization-engine) — the ranking/scoring engine that powers the algos
- [Ozone](https://github.com/bluesky-social/ozone) — the inspiration: a management UI for labelers

## License

MIT
