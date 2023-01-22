import type { NextApiRequest, NextApiResponse } from 'next'

import { getGist } from '@/lib/github'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const LYRICS_GIST_ID = process.env.LYRICS_GIST_ID

	const response = await getGist(LYRICS_GIST_ID)
	const json = await response.json()

	const content = await json.files['lyrics.json'].content

	const data = await JSON.parse(content)

	res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')

	return res.status(200).json(data)
}
