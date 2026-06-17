# AGENTS.md — feed-manager-ui

## Project identity

- **Repo**: `Babesky-com/feed-manager-ui` (private, pre-OSS)
- **Stack**: SvelteKit 2, Svelte 5 runes, TypeScript strict, Tailwind, shadcn-svelte
- **Related**: `Babesky-com/feedgen` (the feed platform this UI manages)

## Dev workflow

- Use `pnpm` as package manager
- Run `pnpm check` before pushing (type-check + lint)
- Feature branches from `main`, PRs into `main`
- Commit format: `feat|fix|chore: description (closes #N)`
- Tests: vitest
- The UI authenticates operators via AT Protocol OAuth
