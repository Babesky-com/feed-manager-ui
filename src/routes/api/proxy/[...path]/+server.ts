import { proxyToAdmin } from '$lib/server/admin-proxy';
import type { RequestHandler } from './$types';

/**
 * Catch-all proxy: /api/proxy/<admin-path>
 *
 * Forwards any request to the feedgen /admin/<admin-path> endpoint,
 * passing through query params, cookies, and request body.
 *
 * This allows the frontend to call any admin API route without needing
 * a dedicated SvelteKit server route for each one.
 *
 * Example: fetch('/api/proxy/feed-preview?limit=25&viewer=user.bsky.social')
 *          → feedgen GET /admin/feed-preview?limit=25&viewer=user.bsky.social
 */
export const GET: RequestHandler = async (event) => {
	const path = event.params.path;
	return proxyToAdmin(event, path);
};

export const POST: RequestHandler = async (event) => {
	const path = event.params.path;
	const body = await event.request.json().catch(() => undefined);
	return proxyToAdmin(event, path, { method: 'POST', body });
};

export const DELETE: RequestHandler = async (event) => {
	const path = event.params.path;
	return proxyToAdmin(event, path, { method: 'DELETE' });
};

export const PUT: RequestHandler = async (event) => {
	const path = event.params.path;
	const body = await event.request.json().catch(() => undefined);
	return proxyToAdmin(event, path, { method: 'PUT', body });
};
