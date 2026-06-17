<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Feed Manager</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="layout">
	<header class="app-header">
		<a href="/" class="logo">
			<span class="logo-icon">FM</span>
			<span>Feed Manager</span>
		</a>
		<nav class="main-nav">
			<a href="/">Home</a>
			<a href="/dashboard">Dashboard</a>
			<a href="https://github.com/Babesky-com/feed-manager-ui" target="_blank">GitHub</a>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>

	<footer class="app-footer">
		<p>Feed Manager — a self-hostable admin dashboard for Bluesky feed generators</p>
	</footer>
</div>

<style>
	.layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: var(--bg-primary, #0a0a0f);
		color: var(--text-primary, #f0f0f5);
	}

	.app-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		background: var(--bg-secondary, #12121a);
		border-bottom: 1px solid var(--border, #2a2a3a);
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 700;
		font-size: 1.25rem;
		color: var(--accent, #6366f1);
		text-decoration: none;
	}

	.logo-icon {
		width: 36px;
		height: 36px;
		background: linear-gradient(135deg, #6366f1, #818cf8);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 0.9rem;
		font-weight: 700;
	}

	.main-nav {
		display: flex;
		gap: 1rem;
	}

	.main-nav a {
		color: var(--text-secondary, #a0a0b0);
		text-decoration: none;
		font-size: 0.9375rem;
		font-weight: 500;
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		transition: all 150ms ease;
	}

	.main-nav a:hover {
		color: var(--text-primary, #f0f0f5);
		background: var(--bg-tertiary, #1a1a24);
	}

	main {
		flex: 1;
		padding: 2rem;
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
	}

	.app-footer {
		padding: 1rem 2rem;
		text-align: center;
		font-size: 0.875rem;
		color: var(--text-muted, #6b6b7b);
		border-top: 1px solid var(--border, #2a2a3a);
	}
</style>
