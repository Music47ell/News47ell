import type { APIContext } from 'astro'
import { getSubscribersCount } from '@/libs/emailoctopus'
import type { Song } from '@/libs/types'

export async function GET() {
	try {
		const data = await getSubscribersCount()

		return Response.json(data)
	} catch {
		return Response.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
