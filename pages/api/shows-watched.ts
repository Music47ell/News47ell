import type { NextApiRequest, NextApiResponse } from 'next'

import { getTMDBShows } from '@/lib/tmdb'
import { getWatchedShows } from '@/lib/trakt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const response = await getWatchedShows()

	const stats = await response.json()

	const ids = stats
		.map((show: { show: { ids: { tmdb: number; imdb: string } } }) => {
			return {
				tmdb: show.show.ids.tmdb,
				imdb: show.show.ids.imdb,
			}
		}, [])
		.filter(
			(show: { tmdb: number }, index: number, self: any[]) =>
				self.findIndex((s: { tmdb: number }) => s.tmdb === show.tmdb) === index
		)
		.slice(0, 10)

	const shows = await Promise.all(
		ids.map(async (id: { tmdb: number; imdb: string }) => {
			const tmdb = await getTMDBShows(id.tmdb)
			const tmdbJson = await tmdb.json()
			const poster = tmdbJson.poster_path
			const link = id.imdb
			const officialTrailers =
				tmdbJson.videos.results.filter(
					(video: { name: string; type: string; official: boolean }) =>
						video.official === true ||
						video.name === 'Official Trailer' ||
						video.name === 'Trailer' ||
						video.type === 'Opening Credits'
				) && tmdbJson.videos.results.filter((video: { site: string }) => video.site === 'YouTube')

			const trailer =
				officialTrailers && officialTrailers.length > 0 ? officialTrailers[0].key : null
			return {
				key: id.tmdb,
				imdb: id.imdb,
				title: tmdbJson.name,
				poster,
				link,
				trailer,
			}
		})
	)

	res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

	return res.status(200).json({ shows })
}
