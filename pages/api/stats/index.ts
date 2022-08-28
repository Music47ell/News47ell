import type { NextApiRequest, NextApiResponse } from 'next'
import { getStats, getMetrics, getYesterdaysStats } from '@/lib/analytics'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { pageviews, uniques } = await getStats()
	const { pageviews: yesterdaysPageviews, uniques: yesterdaysUniques } = await getYesterdaysStats()
	const Pages = await getMetrics('url')
	const Browsers = await getMetrics('browser')
	const OS = await getMetrics('os')
	const Devices = await getMetrics('device')
	const Country = await getMetrics('country')

	res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

	return res.status(200).json({
		allTime: { pageviews, uniques },
		yesterday: { yesterdaysPageviews, yesterdaysUniques },
		Pages,
		Browsers,
		OS,
		Devices,
		Country,
	})
}
