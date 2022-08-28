import { getTMDBMovies, getTMDBShows } from '@/lib/tmdb'
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
	let poster: string
	if (trakt.type === 'movie') {
		title = trakt.movie.title
		id = trakt.movie.ids.tmdb
	} else if (trakt.type === 'episode') {
		title = trakt.show.title
		episodeTitle = trakt.episode.title
		id = trakt.show.ids.tmdb
	}

	switch (trakt.type) {
		case 'movie':
			await getTMDBMovies(id)
				.then(async (tmdb) => {
					const tmdbJson = await tmdb.json()
					poster = tmdbJson.poster_path
				})
				.catch(() => {
					poster = null
				})
				.finally(() => {
					res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')
					return res.status(200).json({ isWatching, title, poster })
				})
			break
		case 'episode':
			await getTMDBShows(id)
				.then(async (tmdb) => {
					const tmdbJson = await tmdb.json()
					poster = tmdbJson.poster_path
				})
				.catch(() => {
					poster = null
				})
				.finally(() => {
					res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')
					return res.status(200).json({ isWatching, title, episodeTitle, poster })
				})
			break
		default:
			return (
				res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30'),
				res.status(200).json({ isWatching: false })
			)
	}
}
