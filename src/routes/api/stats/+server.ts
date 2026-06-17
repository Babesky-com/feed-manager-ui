import { json } from '@sveltejs/kit';

/** GET /api/stats — aggregate feed statistics */
export async function GET() {
	// Placeholder: returns sample stats until connected to a real feedgen instance
	return json({
		dau: 142,
		feeds: 2,
		posts: 15420
	});
}
