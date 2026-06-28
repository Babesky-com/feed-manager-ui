<script lang="ts">
	interface StatsResponse {
		overall?: {
			totalFeedRequests?: number;
			totalImpressions?: number;
			totalUniqueViewers?: number;
			newUsers?: number;
			recurringUsers?: number;
			totalEngagementsInFeed?: number;
			approvedSetSize?: number;
			postCounts?: { last24h?: number; last72h?: number };
		};
		historicalDaily?: { date_utc: string; dau: number; feed_requests: number; impressions: number }[];
	}

	interface FeedMetricsSummary {
		days: number;
		feeds: {
			feed_type: string;
			display_name: string;
			description: string | null;
			feed_uri: string;
			total_views: number;
			total_users: number;
			days_active: number;
		}[];
	}

	let stats = $state<StatsResponse | null>(null);
	let feedSummary = $state<FeedMetricsSummary | null>(null);
	let loading = $state(true);
	let errorMsg = $state<string | null>(null);

	async function loadDashboard() {
		loading = true;
		errorMsg = null;
		try {
			const [statsRes, feedsRes] = await Promise.all([
				fetch('/api/stats'),
				fetch('/api/feeds'),
			]);

			if (statsRes.ok) {
				stats = await statsRes.json();
			} else {
				const err = await statsRes.json().catch(() => ({}));
				errorMsg = err?.message || `Stats: HTTP ${statsRes.status}`;
			}

			if (feedsRes.ok) {
				feedSummary = await feedsRes.json();
			}
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : 'Failed to load dashboard data';
		} finally {
			loading = false;
		}
	}

	function formatNumber(value: number | undefined): string {
		return new Intl.NumberFormat().format(value ?? 0);
	}

	let feeds = $derived(
		feedSummary?.feeds?.length
			? feedSummary.feeds.map((f) => {
					return {
						shortname: f.feed_type,
						displayName: f.display_name || f.feed_type,
						description: f.description || f.feed_uri,
						totalViews: f.total_views,
						totalUsers: f.total_users,
						daysActive: f.days_active,
						feedUri: f.feed_uri,
					};
				})
			: [],
	);

	let maxDauInHistory = $derived(
		Math.max(1, ...(stats?.historicalDaily?.map((d) => d.dau) ?? [1])),
	);

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
	{#if errorMsg}
		<section class="error-banner">
			<strong>Could not load stats:</strong> {errorMsg}
			<p class="muted">Ensure <code>FEEDGEN_ADMIN_URL</code> is set and the feedgen instance is running.</p>
		</section>
	{/if}

	<section class="stats-grid">
		<div class="stat-card highlight">
			<div class="stat-value">{stats?.overall?.totalUniqueViewers ?? '—'}</div>
			<div class="stat-label">Unique Viewers (24h)</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{stats?.overall?.totalFeedRequests ?? '—'}</div>
			<div class="stat-label">Feed Requests (24h)</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{stats?.overall?.totalImpressions ?? '—'}</div>
			<div class="stat-label">Impressions (24h)</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{stats?.overall?.totalEngagementsInFeed ?? '—'}</div>
			<div class="stat-label">In-Feed Engagements (24h)</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{stats?.overall?.approvedSetSize ?? '—'}</div>
			<div class="stat-label">Approved Authors</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{stats?.overall?.postCounts?.last24h ?? '—'}</div>
			<div class="stat-label">Posts Indexed (24h)</div>
		</div>
	</section>

	{#if stats?.historicalDaily?.length}
		<section class="chart-section">
			<h2>DAU — Last {stats.historicalDaily.length} Days</h2>
			<div class="bar-chart">
				{#each stats.historicalDaily as day}
					<div class="bar-col" title="{day.date_utc}: {day.dau} unique viewers">
						<div class="bar" style="height: {(day.dau / maxDauInHistory) * 100}%"></div>
						<span class="bar-label">{day.date_utc.slice(5)}</span>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<section class="feeds-section">
		<div class="section-header">
			<h2>Registered Feeds</h2>
			<a href="/dashboard/feed-preview" class="btn-sm">Feed Preview →</a>
		</div>
		{#if feeds.length === 0}
			<p class="muted">No feed generators registered yet. Connect your feedgen instance to get started.</p>
		{:else}
			<div class="feeds-list">
				{#each feeds as feed}
					<article class="feed-card">
						<h3>{feed.displayName}</h3>
						<p class="feed-type">{feed.shortname}</p>
						<p class="muted">{feed.description}</p>
						<div class="feed-stats">
							<span>{formatNumber(feed.totalViews)} views</span>
							<span>{formatNumber(feed.totalUsers)} users</span>
							<span>{formatNumber(feed.daysActive)} active days</span>
						</div>
						<div class="feed-actions">
							<a href="/dashboard/feed-preview" class="btn-sm">Preview Feed</a>
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
		color: var(--text-muted, #6b6b7b);
		font-size: 0.875rem;
	}

	.error-banner {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: 10px;
		padding: 1rem 1.25rem;
		margin-bottom: 1.5rem;
		color: var(--text-primary, #f0f0f5);
	}

	.error-banner p {
		margin-top: 0.5rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		background: var(--bg-secondary, #12121a);
		border: 1px solid var(--border, #2a2a3a);
		border-radius: 10px;
		padding: 1rem;
		transition: all 150ms ease;
	}

	.stat-card:hover {
		border-color: var(--border-hover, #3a3a4a);
		transform: translateY(-2px);
	}

	.stat-card.highlight {
		background: rgba(99, 102, 241, 0.08);
		border-color: var(--accent, #6366f1);
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary, #f0f0f5);
		margin-bottom: 0.25rem;
		font-variant-numeric: tabular-nums;
	}

	.stat-card.highlight .stat-value {
		color: var(--accent, #6366f1);
	}

	.stat-label {
		font-size: 0.8125rem;
		color: var(--text-muted, #6b6b7b);
		font-weight: 500;
	}

	.chart-section {
		margin-bottom: 2rem;
	}

	.chart-section h2 {
		margin-bottom: 1rem;
	}

	.bar-chart {
		display: flex;
		align-items: flex-end;
		gap: 4px;
		height: 120px;
		background: var(--bg-secondary, #12121a);
		border: 1px solid var(--border, #2a2a3a);
		border-radius: 10px;
		padding: 1rem;
	}

	.bar-col {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		min-width: 24px;
		height: 100%;
	}

	.bar {
		width: 100%;
		max-width: 32px;
		background: linear-gradient(to top, var(--accent, #6366f1), #818cf8);
		border-radius: 4px 4px 0 0;
		min-height: 2px;
		transition: height 200ms ease;
	}

	.bar-label {
		font-size: 0.625rem;
		color: var(--text-muted, #6b6b7b);
		margin-top: 0.25rem;
		writing-mode: vertical-rl;
		text-orientation: mixed;
	}

	.feeds-section {
		margin-top: 1rem;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.feeds-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.feed-card {
		background: var(--bg-secondary, #12121a);
		border: 1px solid var(--border, #2a2a3a);
		border-radius: 10px;
		padding: 1.25rem;
		transition: all 150ms ease;
	}

	.feed-card:hover {
		border-color: var(--border-hover, #3a3a4a);
	}

	.feed-card h3 {
		margin-bottom: 0.25rem;
	}

	.feed-type {
		margin: 0 0 0.5rem;
		color: var(--accent, #6366f1);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.02em;
	}

	.feed-stats {
		display: flex;
		gap: 1rem;
		margin-top: 0.5rem;
		font-size: 0.8125rem;
		color: var(--text-muted, #6b6b7b);
		font-variant-numeric: tabular-nums;
	}

	.feed-actions {
		margin-top: 0.75rem;
	}

	.btn-sm {
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1rem;
		background: var(--accent, #6366f1);
		color: white;
		border-radius: 6px;
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 150ms ease;
	}

	.btn-sm:hover {
		background: var(--accent-hover, #818cf8);
		text-decoration: none;
	}

	.loading {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 2rem;
		color: var(--text-muted, #6b6b7b);
	}

	.spinner {
		width: 20px;
		height: 20px;
		border: 2px solid var(--border, #2a2a3a);
		border-top-color: var(--accent, #6366f1);
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}

	code {
		background: var(--bg-tertiary, #1a1a24);
		padding: 0.125rem 0.375rem;
		border-radius: 4px;
		font-size: 0.8125rem;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
