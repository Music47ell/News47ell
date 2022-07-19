import { getTMDB } from '@/lib/tmdb'
import { getNowWatching } from '@/lib/trakt'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await getNowWatching()

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isWatching: false })
  }

  const trakt = await response.json()

  if (trakt.item === null) {
    return res.status(200).json({ isWatching: false })
  }

  const isWatching = true
  let title: string
  let episodeTitle: string
  let id: number
  if (trakt.type === 'movie') {
    title = trakt.movie.title
    id = trakt.movie.ids.imdb
  } else if (trakt.type === 'episode') {
    title = trakt.show.title
    episodeTitle = trakt.episode.title
    id = trakt.show.ids.imdb
  }

  const tmdb = await getTMDB(id)
  const tmdbJson = await tmdb.json()
  const posterPath =
    tmdbJson.tv_results[0]?.poster_path === undefined
      ? tmdbJson.movie_results[0]?.poster_path
      : tmdbJson.tv_results[0]?.poster_path

  const poster = `https://image.tmdb.org/t/p/original/${posterPath}`

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

  return res.status(200).json({ isWatching, id, title, episodeTitle, poster })
}
