import type { NextApiRequest, NextApiResponse } from 'next'
import { getResume } from '@/lib/github'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await getResume()
  const json = await response.json()

  const content = await json.files['resume.json'].content

  const data = await JSON.parse(content)

  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')

  return res.status(200).json(data)
}
