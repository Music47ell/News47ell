import { getTopLanguages } from '@/libs/codestats'

export async function GET() {
	try {
		const data = await getTopLanguages()

		return Response.json(data)
	} catch {
		return Response.json({ error: 'Something went wrong' })
	}
}
