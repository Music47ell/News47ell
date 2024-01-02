import type { APIContext } from 'astro'
import { getCodeStats } from '@/libs/codestats'

export async function GET() {
	try {
		const data = await getCodeStats()

		return Response.json(data)
	} catch {
		return Response.json({ error: 'Something went wrong' })
	}
}
