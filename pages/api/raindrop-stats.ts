import type { NextApiRequest, NextApiResponse } from 'next'

import { getRaindropCount } from '@/lib/raindrop'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const response = await getRaindropCount()
	const data = await response.json()

	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

	return res.status(200).json(data)
}
