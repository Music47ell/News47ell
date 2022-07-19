import type { NextApiRequest, NextApiResponse } from 'next'
import { getTopSlug } from '@/lib/analytics'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const topSlugs = await getTopSlug()

    const topViews = topSlugs
      // only get slugs with the word 'blog' in them
      .filter(({ x }) => x.includes('/blog/'))
      // get top 3
      .slice(0, 3)
      .map(({ x, y }) => ({
        // create a title by removing -, and /blog/ from slug, and capitalizing the first letter
        title: x
          .replace(/-/g, ' ')
          .replace('/blog/', '')
          .replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) => letter.toUpperCase()),
        slug: x,
        total: y,
      }))

    return res.status(200).json(topViews)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
