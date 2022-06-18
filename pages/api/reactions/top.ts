import type { NextApiRequest, NextApiResponse } from 'next'
import { getTopReactions } from '@/lib/prisma'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const topReactions = await getTopReactions()

    return res.status(200).json(topReactions)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
