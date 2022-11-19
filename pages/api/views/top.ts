import type { NextApiRequest, NextApiResponse } from 'next'

import { getTopViews } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const topViews = await getTopViews()

		return res.status(200).json(topViews)
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
}
