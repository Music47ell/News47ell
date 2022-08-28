import type { NextApiRequest, NextApiResponse } from 'next'
import { getActive } from '@/lib/analytics'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const [{ x: active }] = await getActive()

	return res.status(200).json({ active })
}
