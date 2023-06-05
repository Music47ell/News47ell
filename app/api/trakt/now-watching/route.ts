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
	let id: number
	let title: string
	let url: string
	let poster: string

	switch (trakt.type) {
		case 'movie':
			title = trakt.movie.title
			id = trakt.movie.ids.tmdb
			url = `https://www.themoviedb.org/movie/${id}`
			try {
				const tmdb = await getTMDBMovies(id)
				const tmdbJson = await tmdb.json()
				poster = `https://image.tmdb.org/t/p/original/${tmdbJson.poster_path}`
				return NextResponse.json({ isWatching, title, url, poster })
			} catch (error) {
				poster = ''
				return NextResponse.json({ isWatching, title, url, poster })
			}
		case 'episode':
			title = trakt.episode.title
			id = trakt.show.ids.tmdb
			url = `https://www.themoviedb.org/tv/${id}`
			try {
				const tmdb = await getTMDBShows(id)
				const tmdbJson = await tmdb.json()
				poster = `https://image.tmdb.org/t/p/original/${tmdbJson.poster_path}`
				return NextResponse.json({ isWatching, title, url, poster })
			} catch (error) {
				poster = ''
				return NextResponse.json({ isWatching, title, url, poster })
			}
		default:
			return NextResponse.json({ isWatching: false })
	}
}
