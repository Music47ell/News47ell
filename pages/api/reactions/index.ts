import type { NextApiRequest, NextApiResponse } from 'next'
import { getTotalReactions } from '@/lib/prisma'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getTotalReactions()

    return res.status(200).json(data)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
