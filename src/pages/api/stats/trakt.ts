import type { APIContext } from 'astro'
import { getStats } from '@/libs/trakt'

export async function GET() {
	try {
		const data = await getStats()

		return Response.json(data)
	} catch {
		return Response.json({ error: 'Error fetching Trakt stats' })
	}
}
