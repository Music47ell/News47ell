import type { NextApiRequest, NextApiResponse } from 'next'

import { getWebmentionBySlug } from '@/lib/webmention'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { slug } = req.query
	const data = await getWebmentionBySlug(slug as string)

	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

	return res.status(200).json(data)
}
