import { getCodeStats } from '@/lib/codestats'
import type { NextApiRequest, NextApiResponse } from 'next'
import siteMetadata from '@/data/siteMetadata'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await getCodeStats()
  const data = await response.json()

  data.user = siteMetadata.codestats
  data.url = `https://codestats.net/users/${siteMetadata.codestats}`

  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

  return res.status(200).json(data)
}
