import { json } from '@sveltejs/kit';

/** GET /api/feeds — list all registered feed generators */
export async function GET() {
	// Placeholder: returns sample data until connected to a real feedgen instance
	return json([
		{
			shortname: 'babesky-algo',
			displayName: 'Babesky Algo',
			description: 'Personalized ranking with collaborative filtering, behavioral regime detection, and MMR diversity.'
		},
		{
			shortname: 'chronological',
			displayName: 'Chronological',
			description: 'Simple reverse-chronological feed.'
		}
	]);
}
