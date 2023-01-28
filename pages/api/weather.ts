import type { NextApiRequest, NextApiResponse } from 'next'

import { getWeather } from '@/lib/pirate-weather'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const response = await getWeather()
	const data = await response.json()

	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

	return res.status(200).json(data.currently)
}
