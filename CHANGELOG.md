# Changelog

## [0.1.1] — 2026-06-19

### Added

- Community files: CODE_OF_CONDUCT, CONTRIBUTING, SECURITY, .env.example
- Pre-push type-check hook via `.githooks/pre-push` (auto-installs via `npm ci`)
- Pre-push hook documentation in CONTRIBUTING.md
- Admin API contract documentation (`docs/ADMIN_API_CONTRACT.md`)

### Changed

- **GitHub Actions removed** — all CI is now local pre-push only
- README status updated: "Public — early development"
- AGENTS.md updated with proxy architecture details

### Repository

- Removed `node_modules/` and `.svelte-kit/` from git tracking
- Cleaned build artifacts from history

---

## [0.1.0] — 2026-06-17

### Added

- Initial SvelteKit scaffold with TypeScript
- Landing page with feature highlights and hero section
- Dashboard page with stats grid (DAU, active feeds, posts in index)
- `/api/feeds` — list feed generators
- `/api/stats` — aggregate feed statistics
- Dark theme design system (CSS custom properties)
- Session type definitions (`app.d.ts`)
- MIT License
- Documentation: README, AGENTS.md
