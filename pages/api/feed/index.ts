import { NextApiRequest, NextApiResponse } from 'next'

import { generateRSS } from '@/lib/generate-feeds'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const feed = await generateRSS()

	res.statusCode = 200
	res.setHeader('content-type', 'application/xml')
	res.end(feed.rss2())
}
