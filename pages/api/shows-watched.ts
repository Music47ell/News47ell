import type { NextApiRequest, NextApiResponse } from 'next'
import { getWatchedShows } from '@/lib/trakt'
import { getTMDB } from '@/lib/tmdb'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await getWatchedShows()

  const stats = await response.json()

  const ids = stats
    .map((show) => show.show.ids.imdb)
    .filter((show, index, self) => self.indexOf(show) === index)
    .slice(0, 10)

  const shows = await Promise.all(
    ids.map(async (id) => {
      const tmdb = await getTMDB(id)
      const tmdbJson = await tmdb.json()
      const posterPath = tmdbJson.tv_results[0].poster_path
      const poster = `https://image.tmdb.org/t/p/original${posterPath}`
      const link = `https://www.imdb.com/title/${id}`
      return {
        key: id,
        id,
        title: tmdbJson.tv_results[0].name,
        poster,
        link,
      }
    })
  )

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

  return res.status(200).json({ shows })
}
