import type { APIContext } from 'astro'
import { getSubscribersCount } from '@/libs/emailoctopus'

export async function GET() {
	try {
		const data = await getSubscribersCount()

		return Response.json({ total: data })
	} catch {
		return Response.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
