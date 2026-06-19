import { env } from '$env/dynamic/private';
import { json, error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

/**
 * The base URL of the feedgen admin API (without trailing slash).
 * Set via FEEDGEN_ADMIN_URL env var. Defaults to localhost for dev.
 */
export const ADMIN_BASE_URL = (env.FEEDGEN_ADMIN_URL || 'http://localhost:3000').replace(/\/+$/, '');

/**
 * Optional static Bearer token for machine-to-machine auth.
 * If set, the UI server authenticates to feedgen with this token instead
 * of forwarding the browser's session cookie.
 */
const ADMIN_BEARER_TOKEN = env.FEEDGEN_ADMIN_BEARER_TOKEN || '';

/**
 * Proxy a request from the UI to the feedgen admin API.
 *
 * - Forwards cookies and Authorization header from the browser (unless
 *   ADMIN_BEARER_TOKEN is set, in which case it uses that for all requests).
 * - Passes through query params.
 * - Forwards request body for POST/PUT/DELETE.
 * - Returns the upstream JSON response or an error.
 *
 * @param event The SvelteKit RequestEvent
 * @param adminPath The admin API path (without /admin prefix), e.g. 'stats', 'feed-preview'
 * @param options Override method, body, or strip query string
 */
export async function proxyToAdmin(
	event: RequestEvent,
	adminPath: string,
	options?: {
		method?: string;
		body?: unknown;
		/**
		 * If true, do not forward the browser's query string (use only explicitly set params).
		 * Otherwise, query params from the browser request are appended to the admin URL.
		 */
		stripQuery?: boolean;
	},
): Promise<Response> {
	const method = options?.method ?? event.request.method;
	const queryString = options?.stripQuery ? '' : new URL(event.request.url).search;

	const url = `${ADMIN_BASE_URL}/admin/${adminPath.replace(/^\/+/, '')}${queryString}`;

	const headers: Record<string, string> = {
		Accept: 'application/json',
	};

	if (ADMIN_BEARER_TOKEN) {
		headers['Authorization'] = `Bearer ${ADMIN_BEARER_TOKEN}`;
	} else {
		// Forward cookies for session passthrough
		const cookie = event.request.headers.get('cookie');
		if (cookie) headers['cookie'] = cookie;
		// Forward Authorization header if present
		const auth = event.request.headers.get('authorization');
		if (auth) headers['authorization'] = auth;
	}

	const fetchOptions: RequestInit = { method, headers };

	if (options?.body !== undefined && (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE')) {
		headers['Content-Type'] = 'application/json';
		fetchOptions.body = JSON.stringify(options.body);
	}

	try {
		const upstream = await fetch(url, fetchOptions);
		const data = await upstream.text();

		if (!upstream.ok) {
			let parsed: unknown;
			try {
				parsed = JSON.parse(data);
			} catch {
				parsed = { error: 'UpstreamError', message: data || `HTTP ${upstream.status}` };
			}
			return json(parsed, { status: upstream.status });
		}

		// Return as JSON (even if upstream returned text, try to parse)
		try {
			return json(JSON.parse(data), { status: upstream.status });
		} catch {
			return new Response(data, {
				status: upstream.status,
				headers: { 'Content-Type': upstream.headers.get('content-type') || 'text/plain' },
			});
		}
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		return json(
			{ error: 'ProxyError', message: `Could not reach feedgen admin API at ${ADMIN_BASE_URL}: ${message}` },
			{ status: 502 },
		);
	}
}

/**
 * Type-safe helper to fetch admin data as typed JSON.
 * Throws SvelteKit error on failure.
 */
export async function fetchAdmin<T = unknown>(
	event: RequestEvent,
	adminPath: string,
	options?: { method?: string; body?: unknown; stripQuery?: boolean },
): Promise<T> {
	const response = await proxyToAdmin(event, adminPath, options);
	if (!response.ok) {
		const errBody = await response.json().catch(() => ({ error: 'Unknown' }));
		throw error(response.status, {
			message: (errBody as { message?: string })?.message || (errBody as { error?: string })?.error || `HTTP ${response.status}`,
		});
	}
	return response.json() as Promise<T>;
}
