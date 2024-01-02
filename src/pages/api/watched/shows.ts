import type { APIContext } from 'astro'
import { getWatchedShows } from '@/libs/trakt'

export async function GET() {
	try {
		const data = await getWatchedShows()

		return Response.json(data)
	} catch {
		return Response.json({ error: 'Error fetching Trakt stats' })
	}
}
