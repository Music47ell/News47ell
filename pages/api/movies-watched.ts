import type { NextApiRequest, NextApiResponse } from 'next'
import { getWatchedMovies } from '@/lib/trakt'
import { getTMDB } from '@/lib/tmdb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await getWatchedMovies()

  const stats = await response.json()

  const ids = stats
    .map((movie) => movie.movie.ids.imdb)
    .filter((movie, index, self) => self.indexOf(movie) === index)
    .slice(0, 10)

  const movies = await Promise.all(
    ids.map(async (id) => {
      const tmdb = await getTMDB(id)
      const tmdbJson = await tmdb.json()
      const posterPath = tmdbJson.movie_results[0].poster_path
      const poster = `https://image.tmdb.org/t/p/original${posterPath}`
      const link = `https://www.imdb.com/title/${id}`
      return {
        key: id,
        id,
        title: tmdbJson.movie_results[0].title,
        poster,
        link,
      }
    })
  )

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

  return res.status(200).json({ movies })
}
