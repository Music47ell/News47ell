import type { APIContext } from 'astro'
import { getWatchedMovies } from '@/libs/trakt'

export async function GET() {
	try {
		const data = await getWatchedMovies()

		return Response.json(data)
	} catch {
		return Response.json({ error: 'Error fetching Trakt stats' })
	}
}
