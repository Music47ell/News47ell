import siteMetadata from '@/data/siteMetadata'
import { getTMDBMovies, getTMDBShows } from '@/lib/tmdb'
import { Trakt, TraktMovie, TraktShow } from '@/lib/types'

const TRAKT_CLIENT_ID = process.env.TRAKT_CLIENT_ID

const STATS_ENDPOINT = `https://api.trakt.tv/users/${siteMetadata.author.username}/stats`
const WATCHING_ENDPOINT = `https://api.trakt.tv/users/${siteMetadata.author.username}/watching`
const WATCHED_MOVIES_ENDPOINT = `https://api.trakt.tv/users/${siteMetadata.author.username}/history/movies?page=1&limit=10`
const WATCHED_SHOWS_ENDPOINT = `https://api.trakt.tv/users/${siteMetadata.author.username}/history/shows?limit=500`

export const getStats = async () => {
	if (TRAKT_CLIENT_ID === null || TRAKT_CLIENT_ID === undefined) {
		throw new Error(`No Trakt API key found!`)
	}
	const response = await fetch(STATS_ENDPOINT, {
		headers: {
			'content-type': 'application/json',
			'trakt-api-version': '2',
			'trakt-api-key': TRAKT_CLIENT_ID,
		},
	})

	const stats = (await response.json()) as Trakt

	stats.user = siteMetadata.author.username
	stats.url = `https://trakt.tv/users/${siteMetadata.author.username}/`

	return stats
}

export const getNowWatching = async () => {
	if (TRAKT_CLIENT_ID === null || TRAKT_CLIENT_ID === undefined) {
		throw new Error(`No Trakt API key found!`)
	}
	return fetch(WATCHING_ENDPOINT, {
		headers: {
			'content-type': 'application/json',
			'trakt-api-version': '2',
			'trakt-api-key': TRAKT_CLIENT_ID,
		},
	})
}

export const getWatchedMovies = async () => {
	if (TRAKT_CLIENT_ID === null || TRAKT_CLIENT_ID === undefined) {
		throw new Error(`No Trakt API key found!`)
	}
	const response = await fetch(WATCHED_MOVIES_ENDPOINT, {
		headers: {
			'content-type': 'application/json',
			'trakt-api-version': '2',
			'trakt-api-key': TRAKT_CLIENT_ID,
		},
	})

	const stats = (await response.json()) as TraktMovie[]

	const ids = stats
		.map((movie: { movie: { ids: { tmdb: number; imdb: string } } }) => {
			return {
				tmdb: movie.movie.ids.tmdb,
				imdb: movie.movie.ids.imdb,
			}
		})
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
				imdb: id.imdb,
				title: tmdbJson.title,
				poster,
				link,
				trailer,
			}
		})
	)

	return movies
}

export const getWatchedShows = async () => {
	if (TRAKT_CLIENT_ID === null || TRAKT_CLIENT_ID === undefined) {
		throw new Error(`No Trakt API key found!`)
	}
	const response = await fetch(WATCHED_SHOWS_ENDPOINT, {
		headers: {
			'content-type': 'application/json',
			'trakt-api-version': '2',
			'trakt-api-key': TRAKT_CLIENT_ID,
		},
	})

	const stats = (await response.json()) as TraktShow[]

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
				imdb: id.imdb,
				title: tmdbJson.name,
				poster,
				link,
				trailer,
			}
		})
	)

	return shows
}
