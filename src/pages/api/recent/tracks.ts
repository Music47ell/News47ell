import type { APIContext } from 'astro'
import { getRecentTracks } from '@/libs/spotify'

export async function GET() {
	try {
		const data = await getRecentTracks()

		return Response.json(data)
	} catch {
		return Response.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
