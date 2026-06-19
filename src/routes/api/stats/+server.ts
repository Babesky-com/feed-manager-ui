import { proxyToAdmin } from '$lib/server/admin-proxy';
import type { RequestHandler } from './$types';

/** GET /api/stats — proxy to feedgen /admin/stats */
export const GET: RequestHandler = async (event) => {
	return proxyToAdmin(event, 'stats');
};
