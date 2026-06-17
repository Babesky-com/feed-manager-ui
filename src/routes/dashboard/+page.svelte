<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	let feeds = $state<{ shortname: string; displayName: string; description: string }[]>([]);
	let stats = $state<{ dau: number; feeds: number; posts: number } | null>(null);
	let loading = $state(true);

	async function loadDashboard() {
		loading = true;
		try {
			const res = await fetch('/api/feeds');
			if (res.ok) {
				feeds = await res.json();
			}
			const statsRes = await fetch('/api/stats');
			if (statsRes.ok) {
				stats = await statsRes.json();
			}
		} catch (e) {
			console.error('Failed to load dashboard data', e);
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		loadDashboard();
	});
</script>

<svelte:head>
	<title>Dashboard — Feed Manager</title>
</svelte:head>

<section class="dash-header">
	<h1>Dashboard</h1>
	<p class="muted">Monitor and manage your feed generator instances</p>
</section>

{#if loading}
	<section class="loading">
		<div class="spinner"></div>
		<span>Loading dashboard data…</span>
	</section>
{:else}
	<section class="stats-grid">
		<div class="stat-card highlight">
			<div class="stat-value">{stats?.dau ?? '—'}</div>
			<div class="stat-label">Daily Active Users</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{stats?.feeds ?? '—'}</div>
			<div class="stat-label">Active Feeds</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{stats?.posts ?? '—'}</div>
			<div class="stat-label">Posts in Index</div>
		</div>
	</section>

	<section class="feeds-section">
		<h2>Registered Feeds</h2>
		{#if feeds.length === 0}
			<p class="muted">No feed generators registered yet. Connect your first feed generator to get started.</p>
		{:else}
			<div class="feeds-list">
				{#each feeds as feed}
					<article class="feed-card">
						<h3>{feed.displayName}</h3>
						<p class="muted">{feed.description || feed.shortname}</p>
						<div class="feed-actions">
							<a href="/dashboard/feeds/{feed.shortname}" class="btn-sm">View Details</a>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</section>
{/if}

<style>
	.dash-header {
		margin-bottom: 2rem;
	}

	.muted {
		color: var(--text-muted);
		font-size: 0.875rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 1rem;
		transition: all 150ms ease;
	}

	.stat-card:hover {
		border-color: var(--border-hover);
		transform: translateY(-2px);
	}

	.stat-card.highlight {
		background: var(--accent-subtle);
		border-color: var(--accent);
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
		font-variant-numeric: tabular-nums;
	}

	.stat-card.highlight .stat-value {
		color: var(--accent);
	}

	.stat-label {
		font-size: 0.8125rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	.feeds-section {
		margin-top: 1rem;
	}

	.feeds-section h2 {
		margin-bottom: 1rem;
	}

	.feeds-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.feed-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 1.25rem;
		transition: all 150ms ease;
	}

	.feed-card:hover {
		border-color: var(--border-hover);
	}

	.feed-card h3 {
		margin-bottom: 0.25rem;
	}

	.feed-actions {
		margin-top: 0.75rem;
	}

	.btn-sm {
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1rem;
		background: var(--accent);
		color: white;
		border-radius: 6px;
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 150ms ease;
	}

	.btn-sm:hover {
		background: var(--accent-hover);
		text-decoration: none;
	}

	.loading {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 2rem;
		color: var(--text-muted);
	}

	.spinner {
		width: 20px;
		height: 20px;
		border: 2px solid var(--border);
		border-top-color: var(--accent);
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
