import type { APIContext } from 'astro'
import { getSubscribedPodcasts } from '@/libs/spotify'

export async function GET() {
	try {
		const data = await getSubscribedPodcasts()

		return Response.json(data)
	} catch {
		return Response.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
