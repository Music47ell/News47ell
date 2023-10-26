import { NextResponse } from 'next/server'

import { getTMDBData } from '@/lib/tmdb'
import { getNowWatching } from '@/lib/trakt'

export const runtime = 'edge'
export const fetchCache = 'force-no-store'

export const GET = async () => {
	const response = await getNowWatching()

	if (response.status === 204 || response.status > 400 || !response.data) {
		return NextResponse.json({ isWatching: false })
	}

	const trakt = response.data

	const isWatching = true
	let title = ''
	let id = 0
	let url = ''
	let poster = ''

	switch (trakt.type) {
		case 'movie':
			if (trakt.movie) {
				title = trakt.movie.title
				id = trakt.movie.ids.tmdb
				url = `https://www.themoviedb.org/movie/${id}`
				try {
					const tmdb = await getTMDBData(id, 'movies')
					const tmdbJson = await tmdb.json()
					poster = `https://image.tmdb.org/t/p/original/${tmdbJson.poster_path}`
				} catch (error) {
					poster = ''
				}
			}
			break

		case 'episode':
			if (trakt.episode && trakt.show) {
				title = trakt.episode.title
				id = trakt.show.ids.tmdb
				url = `https://www.themoviedb.org/tv/${id}`
				try {
					const tmdb = await getTMDBData(id, 'shows')
					const tmdbJson = await tmdb.json()
					poster = `https://image.tmdb.org/t/p/original/${tmdbJson.poster_path}`
				} catch (error) {
					poster = ''
				}
			}
			break
	}

	return NextResponse.json({ isWatching, title, url, poster })
}
