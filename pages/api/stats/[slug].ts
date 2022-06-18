import type { NextApiRequest, NextApiResponse } from 'next'
import { getSlugStats } from '@/lib/analytics'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pageviews } = await getSlugStats(req.query.slug as string)

  return res.status(200).json({ pageviews: pageviews })
}
