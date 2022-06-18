import { getRaindropCollection } from '@/lib/raindrop'
import type { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = 0
  const request = await getRaindropCollection(process.env.RAINDROP_COLLECTION, page)

  const data = await request.json()
  const count = data.count
  let bookmarks = data.items.map(({ cover, title, link, lastUpdate, tags }) => ({
    link,
    title,
    cover,
    lastUpdate,
    tags,
  }))

  let tags = Array.from(new Set(bookmarks.flatMap(({ tags }) => tags)))

  const currentPage = page
  const totalPages = Math.floor(count / 25)
  const isLastPage = currentPage === totalPages

  for (let i = currentPage; i < totalPages && !isLastPage; i++) {
    const nextPage = i + 1
    const nextRequest = await getRaindropCollection(process.env.RAINDROP_COLLECTION, nextPage)

    const nextData = await nextRequest.json()
    const nextBookmarks = nextData.items.map(({ cover, title, link, lastUpdate, tags }) => ({
      link,
      title,
      cover,
      lastUpdate,
      tags,
    }))

    bookmarks.push(...nextBookmarks)

    bookmarks = Array.from(new Set(bookmarks))

    const nextTags = Array.from(new Set(nextBookmarks.flatMap(({ tags }) => tags)))
    tags.push(...nextTags)

    // remove duplicate tags
    tags = Array.from(new Set(tags))
  }

  const l = bookmarks.length

  return res.status(200).json({
    l,
    tags,
    bookmarks,
  })
}
