<script lang="ts">
	import { page } from '$app/stores';

	interface FeedPreviewItem {
		uri: string;
		post?: {
			text?: string | null;
			handle?: string | null;
			displayName?: string | null;
			avatar?: string | null;
			bskyUrl?: string;
		};
		score?: number;
		reasons?: { signal: string; value: number; detail?: string }[];
	}

	interface PreviewResponse {
		cursor?: string;
		feed: FeedPreviewItem[];
	}

	interface PreviewError {
		error?: string;
		message?: string;
	}

	let viewer = $state('');
	let limit = $state(25);
	let jitter = $state(true);
	let loading = $state(false);
	let errorMsg = $state<string | null>(null);
	let preview = $state<PreviewResponse | null>(null);

	// Read viewer from query param on load
	$effect(() => {
		const queryViewer = $page.url.searchParams.get('viewer');
		if (queryViewer && !viewer) {
			viewer = queryViewer;
		}
	});

	async function fetchPreview(cursor?: string) {
		loading = true;
		errorMsg = null;

		const params = new URLSearchParams();
		params.set('limit', String(limit));
		if (viewer.trim()) params.set('viewer', viewer.trim());
		if (!jitter) params.set('jitter', '0');
		if (cursor) params.set('cursor', cursor);

		try {
			const res = await fetch(`/api/proxy/feed-preview?${params}`);
			const data: PreviewResponse & PreviewError = await res.json();

			if (!res.ok) {
				errorMsg = data.message || data.error || `HTTP ${res.status}`;
				preview = null;
			} else if (cursor && preview) {
				// Append for pagination
				preview = { cursor: data.cursor, feed: [...preview.feed, ...data.feed] };
			} else {
				preview = data;
			}
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : 'Failed to fetch feed preview';
			preview = null;
		} finally {
			loading = false;
		}
	}

	function loadMore() {
		if (preview?.cursor) fetchPreview(preview.cursor);
	}

	function formatScore(score?: number): string {
		if (typeof score !== 'number') return '—';
		return score.toFixed(3);
	}

	function topReasons(reasons?: { signal: string; value: number }[]): { signal: string; value: number }[] {
		if (!reasons?.length) return [];
		return [...reasons].sort((a, b) => b.value - a.value).slice(0, 5);
	}
</script>

<svelte:head>
	<title>Feed Preview — Feed Manager</title>
</svelte:head>

<section class="header">
	<h1>Feed Preview</h1>
	<p class="muted">See exactly what the feed algorithm returns for any viewer, with per-post scoring reasons.</p>
</section>

<form class="controls" onsubmit={(e) => { e.preventDefault(); fetchPreview(); }}>
	<div class="control-row">
		<label class="control">
			<span class="control-label">Viewer (handle or DID)</span>
			<input
				type="text"
				bind:value={viewer}
				placeholder="user.bsky.social"
				class="text-input"
			/>
		</label>
		<label class="control control-limit">
			<span class="control-label">Limit</span>
			<input type="number" bind:value={limit} min="1" max="100" class="text-input limit-input" />
		</label>
		<label class="control-toggle">
			<input type="checkbox" bind:checked={jitter} />
			<span>Score jitter</span>
		</label>
		<button type="submit" disabled={loading} class="btn primary">
			{loading ? 'Loading…' : 'Preview Feed'}
		</button>
	</div>
</form>

{#if errorMsg}
	<div class="error-banner">
		<strong>Error:</strong> {errorMsg}
	</div>
{/if}

{#if preview?.feed?.length}
	<section class="results">
		<p class="result-count">Showing {preview.feed.length} posts{#if preview.cursor} — scroll for more{/if}</p>

		<div class="post-list">
			{#each preview.feed as item, i}
				<article class="post-card">
					<div class="post-rank">#{i + 1}</div>
					<div class="post-score">{formatScore(item.score)}</div>
					<div class="post-body">
						<div class="post-meta">
							{#if item.post?.avatar}
								<img src={item.post.avatar} alt="" class="avatar" />
							{/if}
							<span class="handle">{item.post?.displayName || item.post?.handle || 'Unknown'}</span>
							{#if item.post?.handle}
								<span class="at">@{item.post.handle}</span>
							{/if}
							{#if item.post?.bskyUrl}
								<a href={item.post.bskyUrl} target="_blank" rel="noopener" class="external-link">↗</a>
							{/if}
						</div>
						{#if item.post?.text}
							<p class="post-text">{item.post.text}</p>
						{:else}
							<p class="post-text muted">Post text not available</p>
						{/if}
						{#if item.reasons?.length}
							<div class="reasons">
								<span class="reasons-label">Top signals:</span>
								{#each topReasons(item.reasons) as reason}
									<span class="reason-chip" title="{reason.signal}: {reason.value}">
										{reason.signal}
										<span class="reason-value">{reason.value.toFixed(2)}</span>
									</span>
								{/each}
							</div>
						{/if}
					</div>
				</article>
			{/each}
		</div>

		{#if preview.cursor}
			<button onclick={loadMore} disabled={loading} class="btn secondary load-more">
				{loading ? 'Loading…' : 'Load More'}
			</button>
		{/if}
	</section>
{:else if !loading && !errorMsg}
	<div class="empty-state">
		<p>Enter a viewer handle and click <strong>Preview Feed</strong> to see what the algorithm returns.</p>
		<p class="muted">Leave viewer blank to use your own account.</p>
	</div>
{/if}

<style>
	.header {
		margin-bottom: 2rem;
	}

	.muted {
		color: var(--text-muted, #6b6b7b);
		font-size: 0.875rem;
	}

	.controls {
		background: var(--bg-secondary, #12121a);
		border: 1px solid var(--border, #2a2a3a);
		border-radius: 10px;
		padding: 1.25rem;
		margin-bottom: 2rem;
	}

	.control-row {
		display: flex;
		align-items: flex-end;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.control {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		flex: 1;
		min-width: 200px;
	}

	.control-limit {
		flex: 0 0 100px;
		min-width: 80px;
	}

	.control-toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--text-secondary, #a0a0b0);
		cursor: pointer;
		padding-bottom: 0.625rem;
	}

	.control-label {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-muted, #6b6b7b);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.text-input {
		background: var(--bg-primary, #0a0a0f);
		border: 1px solid var(--border, #2a2a3a);
		border-radius: 6px;
		padding: 0.5rem 0.75rem;
		color: var(--text-primary, #f0f0f5);
		font-size: 0.9375rem;
		outline: none;
	}

	.text-input:focus {
		border-color: var(--accent, #6366f1);
	}

	.limit-input {
		text-align: center;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		padding: 0.625rem 1.25rem;
		border-radius: 8px;
		font-weight: 600;
		font-size: 0.9375rem;
		border: none;
		cursor: pointer;
		transition: all 150ms ease;
	}

	.btn.primary {
		background: var(--accent, #6366f1);
		color: white;
	}

	.btn.primary:hover:not(:disabled) {
		background: var(--accent-hover, #818cf8);
	}

	.btn.primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn.secondary {
		background: var(--bg-tertiary, #1a1a24);
		color: var(--text-primary, #f0f0f5);
		border: 1px solid var(--border, #2a2a3a);
	}

	.error-banner {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: 10px;
		padding: 1rem 1.25rem;
		margin-bottom: 1.5rem;
	}

	.results {
		margin-top: 1rem;
	}

	.result-count {
		font-size: 0.875rem;
		color: var(--text-muted, #6b6b7b);
		margin-bottom: 1rem;
	}

	.post-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.post-card {
		display: flex;
		gap: 1rem;
		background: var(--bg-secondary, #12121a);
		border: 1px solid var(--border, #2a2a3a);
		border-radius: 10px;
		padding: 1rem 1.25rem;
		transition: border-color 150ms ease;
	}

	.post-card:hover {
		border-color: var(--border-hover, #3a3a4a);
	}

	.post-rank {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--text-muted, #6b6b7b);
		min-width: 28px;
		padding-top: 0.125rem;
	}

	.post-score {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--accent, #6366f1);
		font-variant-numeric: tabular-nums;
		min-width: 56px;
		text-align: right;
		padding-top: 0.125rem;
	}

	.post-body {
		flex: 1;
		min-width: 0;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		flex-wrap: wrap;
	}

	.avatar {
		width: 24px;
		height: 24px;
		border-radius: 50%;
	}

	.handle {
		font-weight: 600;
		font-size: 0.875rem;
		color: var(--text-primary, #f0f0f5);
	}

	.at {
		font-size: 0.8125rem;
		color: var(--text-muted, #6b6b7b);
	}

	.external-link {
		font-size: 0.875rem;
		color: var(--text-muted, #6b6b7b);
		text-decoration: none;
		transition: color 150ms ease;
	}

	.external-link:hover {
		color: var(--accent, #6366f1);
	}

	.post-text {
		font-size: 0.9375rem;
		color: var(--text-secondary, #a0a0b0);
		line-height: 1.5;
		word-break: break-word;
		margin-bottom: 0.5rem;
	}

	.post-text.muted {
		color: var(--text-muted, #6b6b7b);
		font-style: italic;
	}

	.reasons {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		flex-wrap: wrap;
		margin-top: 0.5rem;
	}

	.reasons-label {
		font-size: 0.75rem;
		color: var(--text-muted, #6b6b7b);
		font-weight: 600;
	}

	.reason-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.6875rem;
		background: var(--bg-tertiary, #1a1a24);
		border: 1px solid var(--border, #2a2a3a);
		border-radius: 4px;
		padding: 0.125rem 0.375rem;
		color: var(--text-secondary, #a0a0b0);
	}

	.reason-value {
		font-weight: 700;
		color: var(--accent, #6366f1);
		font-variant-numeric: tabular-nums;
	}

	.load-more {
		margin-top: 1.5rem;
		width: 100%;
		justify-content: center;
	}

	.empty-state {
		text-align: center;
		padding: 3rem 2rem;
		color: var(--text-muted, #6b6b7b);
	}

	.empty-state p {
		margin-bottom: 0.5rem;
	}
</style>
