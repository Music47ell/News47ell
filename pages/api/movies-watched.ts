import type { NextApiRequest, NextApiResponse } from 'next'

import { getTMDBMovies } from '@/lib/tmdb'
import { getWatchedMovies } from '@/lib/trakt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const response = await getWatchedMovies()

	const stats = await response.json()

	const ids = stats
		.map((movie: { movie: { ids: { tmdb: number; imdb: string } } }) => {
			return {
				tmdb: movie.movie.ids.tmdb,
				imdb: movie.movie.ids.imdb,
			}
		}, [])
		.filter(
			(movie: { tmdb: number }, index: number, self: any[]) =>
				self.findIndex((s: { tmdb: number }) => s.tmdb === movie.tmdb) === index
		)
		.slice(0, 10)

	const movies = await Promise.all(
		ids.map(async (id: { tmdb: number; imdb: string }) => {
			const tmdb = await getTMDBMovies(id.tmdb)
			const tmdbJson = await tmdb.json()
			const poster = tmdbJson.poster_path
			const link = id.imdb
			const trailer =
				tmdbJson.videos.results.find((video: { name: string }) => video.name === 'Official Trailer')
					?.key ||
				tmdbJson.videos.results.find((video: { type: string }) => video.type === 'Trailer')?.key ||
				null
			return {
				key: id.tmdb,
				imdb: id.imdb,
				title: tmdbJson.title,
				poster,
				link,
				trailer,
			}
		})
	)

	res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

	return res.status(200).json({ movies })
}
