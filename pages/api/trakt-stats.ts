import type { NextApiRequest, NextApiResponse } from 'next'

import siteMetadata from '@/data/siteMetadata'
import { getStats } from '@/lib/trakt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const response = await getStats()
	const stats = await response.json()

	stats.user = siteMetadata.trakt
	stats.url = `https://trakt.tv/users/${siteMetadata.trakt}/`

	res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

	return res.status(200).json(stats)
}
