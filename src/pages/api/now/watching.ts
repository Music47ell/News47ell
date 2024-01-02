import type { APIContext } from 'astro'
import { getTMDBData } from '@/libs/tmdb'
import { getNowWatching } from '@/libs/trakt'

export async function GET() {
	try {
		const response = await getNowWatching()
		const { data, status } = response

		if (status === 204 || status >= 400 || !data) {
			return Response.json({ isPlaying: false })
		}

		const commonFields = {
			isWatching: true,
		}

		if (data.type === 'movie' && data.movie) {
			const { title, ids } = data.movie
			const tmdb = await getTMDBData(ids.tmdb, 'movies')
			const tmdbJson = await tmdb.json()

			return Response.json({
				...commonFields,
				id: ids.tmdb,
				title,
				url: `https://www.themoviedb.org/movie/${ids.tmdb}`,
				image: `https://image.tmdb.org/t/p/original/${tmdbJson.poster_path}`,
			})
		} else if (data.type === 'episode' && data.episode && data.show) {
			const { title, ids } = data.show
			const tmdb = await getTMDBData(ids.tmdb, 'shows')
			const tmdbJson = await tmdb.json()

			return Response.json({
				...commonFields,
				id: ids.tmdb,
				title,
				url: `https://www.themoviedb.org/tv/${ids.tmdb}`,
				image: `https://image.tmdb.org/t/p/original/${tmdbJson.poster_path}`,
			})
		} else {
			return Response.json({ isPlaying: false })
		}
	} catch (error) {
		return Response.json({ isPlaying: false }, { status: 500 })
	}
}
