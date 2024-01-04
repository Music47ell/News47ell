import type { APIContext } from 'astro'
import { getBlogViews } from '@/libs/turso'

export async function GET() {
	try {
		const data = await getBlogViews()

		return Response.json({ total: data })
	} catch {
		return Response.json({ error: 'Error fetching views' }, { status: 500 })
	}
}
