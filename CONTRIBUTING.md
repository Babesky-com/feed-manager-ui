# Contributing to feed-manager-ui

Thanks for your interest in contributing! This document outlines the process.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone git@github.com:<your-username>/feed-manager-ui.git`
3. Install dependencies: `npm ci`
4. Run the type checker: `npm run check`
5. Start the dev server: `npm run dev`

## Development Workflow

- **Branches**: Create feature/fix branches from `main`.
- **Naming**: Use `feat/`, `fix/`, `chore/`, `docs/` prefix.
- **Commit format**: `feat|fix|chore: description (closes #N)`
- **Before pushing**: Run `npm run check` to verify type-check + lint.
- **PRs**: Open a PR against `main` with a clear description of changes.

## Commit Messages

We follow a conventional commit format:

```
feat: add algorithm preview endpoint (closes #12)
fix: handle empty feed list in dashboard (closes #7)
chore: update dependencies
docs: add CONTRIBUTING guide
```

## Pull Request Process

1. Ensure `npm run check` passes locally
2. Update documentation if you're changing behaviour
3. Link the issue your PR closes in the body (`Closes #N`)
4. Wait for CI to pass on your PR

## Code Style

- TypeScript strict mode
- Svelte 5 runes syntax ($state, $derived, $effect)
- CSS custom properties for theming
- Single quotes for strings

## Questions?

Open a [discussion](https://github.com/Babesky-com/feed-manager-ui/discussions) or file an [issue](https://github.com/Babesky-com/feed-manager-ui/issues).
