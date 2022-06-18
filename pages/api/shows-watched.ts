import type { NextApiRequest, NextApiResponse } from 'next'
import { getWatchedShows } from '@/lib/trakt'
import { getTMDB } from '@/lib/tmdb'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await getWatchedShows()

  const stats = await response.json()

  const showsPosters = await Promise.all(
    stats.map(async (show) => {
      const id = show.show.ids.imdb
      const tmdb = await getTMDB(id)
      const tmdbJson = await tmdb.json()
      const posterPath = tmdbJson.tv_results[0]?.poster_path
      const poster = `https://image.tmdb.org/t/p/original${posterPath}`
      const link = `https://www.imdb.com/title/${id}`
      return {
        key: show.id,
        id,
        title: show.show.title,
        poster,
        link,
      }
    })
  )

  const shows = showsPosters
    .filter((show) => !show.poster.includes('undefined'))
    .filter(
      (
        (s) => (o) =>
          ((k) => !s.has(k) && s.add(k))(['title', 'id'].map((k) => o[k]).join('|'))
      )(new Set())
    )
    .slice(0, 10)

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

  return res.status(200).json({ shows })
}
