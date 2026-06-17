<script lang="ts">
</script>

<svelte:head>
	<title>Feed Manager — Manage self-hosted Bluesky feeds</title>
</svelte:head>

<section class="hero">
	<h1>Feed Manager</h1>
	<p class="tagline">A self-hostable admin dashboard for Bluesky feed generators</p>
	<p class="subtitle">Inspired by <a href="https://github.com/bluesky-social/ozone" target="_blank">Ozone</a> — the management UI for labelers — but for feed engines.</p>

	<div class="cta-row">
		<a href="/dashboard" class="btn primary">Go to Dashboard</a>
		<a href="https://github.com/Babesky-com/feedgen" class="btn secondary" target="_blank">View feedgen</a>
	</div>
</section>

<section class="features">
	<div class="feature-card">
		<h3>Multi-feed Dashboard</h3>
		<p>See all your feed generators in one place — monitor health, metrics, and configuration.</p>
	</div>
	<div class="feature-card">
		<h3>Algorithm Preview</h3>
		<p>Inspect what posts a feed would return for any viewer, with per-post reasoning.</p>
	</div>
	<div class="feature-card">
		<h3>Per-feed Metrics</h3>
		<p>Track DAU, request volume, cache hit rates, and latency per feed instance.</p>
	</div>
	<div class="feature-card">
		<h3>Feed Config</h3>
		<p>Toggle feature flags, adjust parameters, manage approved author sets.</p>
	</div>
</section>

<style>
	.hero {
		text-align: center;
		padding: 4rem 2rem;
	}

	.hero h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		background: linear-gradient(135deg, #6366f1, #a78bfa);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.tagline {
		font-size: 1.25rem;
		color: var(--text-secondary);
		margin-bottom: 1rem;
	}

	.subtitle {
		font-size: 0.9375rem;
		color: var(--text-muted);
		margin-bottom: 2rem;
	}

	.cta-row {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-weight: 600;
		font-size: 0.9375rem;
		text-decoration: none;
		transition: all 150ms ease;
	}

	.btn.primary {
		background: var(--accent);
		color: white;
	}

	.btn.primary:hover {
		background: var(--accent-hover);
		transform: translateY(-1px);
		text-decoration: none;
	}

	.btn.secondary {
		background: var(--bg-tertiary);
		color: var(--text-primary);
		border: 1px solid var(--border);
	}

	.btn.secondary:hover {
		background: var(--bg-elevated);
		border-color: var(--border-hover);
		text-decoration: none;
	}

	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.5rem;
		padding: 2rem;
	}

	.feature-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 1.5rem;
		transition: all 150ms ease;
	}

	.feature-card:hover {
		border-color: var(--border-hover);
		transform: translateY(-2px);
	}

	.feature-card h3 {
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.feature-card p {
		color: var(--text-secondary);
		font-size: 0.9375rem;
	}
</style>
