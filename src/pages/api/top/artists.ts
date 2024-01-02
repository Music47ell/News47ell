import type { APIContext } from 'astro'
import { getTopArtists } from '@/libs/spotify'

export async function GET() {
	try {
		const data = await getTopArtists()

		return Response.json(data)
	} catch {
		return Response.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
