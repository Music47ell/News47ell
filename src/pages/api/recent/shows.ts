import type { APIContext } from 'astro'
import { getSubscribedShows } from '@/libs/spotify'
import type { Song } from '@/libs/types'

export async function GET() {
	try {
		const data = await getSubscribedShows()

		return Response.json(data)
	} catch {
		return Response.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
