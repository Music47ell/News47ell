import type { NextApiRequest, NextApiResponse } from 'next'

import { getCommitData } from '@/lib/github'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const slug = req.query.slug as string
	const response = await getCommitData(slug)

	const data = await response.json()

	// if data message: 'Git Repository is empty.', then use this
	if (data.message === 'Git Repository is empty.') {
		return null
	}

	// if data length is 0, then use this
	if (data.length === 0) {
		return res.status(200).json('This file does not exist in the repo.')
	}

	const firstCommitDate = data[data.length - 1].commit.author.date
	const lastCommitDate = data[0].commit.author.date
	const firstCommitHash = data[data.length - 1].sha
	const lastCommitHash = data[0].sha

	res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')

	return res.status(200).json({ firstCommitDate, lastCommitDate, firstCommitHash, lastCommitHash })
}
