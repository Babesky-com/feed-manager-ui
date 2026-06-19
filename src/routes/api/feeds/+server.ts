import { proxyToAdmin } from '$lib/server/admin-proxy';
import type { RequestHandler } from './$types';

/** GET /api/feeds — proxy to feedgen /admin/feed-daily-metrics-summary */
export const GET: RequestHandler = async (event) => {
	return proxyToAdmin(event, 'feed-daily-metrics-summary');
};
