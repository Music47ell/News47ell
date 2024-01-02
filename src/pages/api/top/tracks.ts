import type { APIContext } from 'astro'
import { getTopTracks } from '@/libs/spotify'

export async function GET() {
	try {
		const data = await getTopTracks()

		return Response.json(data)
	} catch {
		return Response.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
