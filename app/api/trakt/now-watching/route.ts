import { NextResponse } from 'next/server'

import { getTMDBMovies, getTMDBShows } from '@/lib/tmdb'
import { getNowWatching } from '@/lib/trakt'
export const runtime = 'edge'

export const GET = async () => {
	const response = await getNowWatching()

	if (response.status === 204 || response.status > 400) {
		return NextResponse.json({ isWatching: false })
	}

	const trakt = await response.json()

	const isWatching = true
	let title: string
	let episodeTitle: string
	let id: number
	let poster: string

	switch (trakt.type) {
		case 'movie':
			title = trakt.movie.title
			id = trakt.movie.ids.tmdb
			await getTMDBMovies(id)
				.then(async (tmdb) => {
					const tmdbJson = await tmdb.json()
					poster = tmdbJson.poster_path
				})
				.catch(() => {
					poster = ''
				})
				.finally(() => {
					return NextResponse.json({ isWatching, title, poster })
				})
			break
		case 'episode':
			title = trakt.show.title
			episodeTitle = trakt.episode.title
			id = trakt.show.ids.tmdb
			await getTMDBShows(id)
				.then(async (tmdb) => {
					const tmdbJson = await tmdb.json()
					poster = tmdbJson.poster_path
				})
				.catch(() => {
					poster = ''
				})
				.finally(() => {
					return NextResponse.json({ isWatching, title, episodeTitle, poster })
				})
			break
		default:
			return NextResponse.json({ isWatching: false })
	}
}
