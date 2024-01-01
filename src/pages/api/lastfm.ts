import type { APIContext } from 'astro'
import { getStats } from '@/libs/lastfm'

export async function GET() {
	try {
		const data = await getStats()

		return Response.json(data)
	} catch {
		return Response.json({ error: 'Something went wrong' })
	}
}
