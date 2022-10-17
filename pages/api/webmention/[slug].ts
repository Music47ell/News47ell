import { getWebmentionBySlug } from '@/lib/webmention'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const data = await getWebmentionBySlug(req.query.slug as string)

	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

	return res.status(200).json(data)
}
