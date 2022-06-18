import type { NextApiRequest, NextApiResponse } from 'next'
import { getWatchedMovies } from '@/lib/trakt'
import { getTMDB } from '@/lib/tmdb'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await getWatchedMovies()

  const stats = await response.json()

  const moviesPosters = await Promise.all(
    stats.map(async (movie) => {
      const id = movie.movie.ids.imdb
      const tmdb = await getTMDB(id)
      const tmdbJson = await tmdb.json()
      const posterPath = tmdbJson.movie_results[0].poster_path
      const poster = `https://image.tmdb.org/t/p/original${posterPath}`
      const link = `https://www.imdb.com/title/${id}`
      return {
        key: movie.id,
        id,
        title: movie.movie.title,
        poster,
        link,
      }
    })
  )

  const movies = moviesPosters.filter((movie) => !movie.poster.includes('undefined')).slice(0, 10)

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

  return res.status(200).json({ movies })
}
