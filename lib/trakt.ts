import siteMetadata from '@/data/siteMetadata'
import { getTMDBData } from '@/lib/tmdb'
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

	return stats
}

export const getNowWatching = async () => {
	if (TRAKT_CLIENT_ID === null || TRAKT_CLIENT_ID === undefined) {
		throw new Error(`No Trakt API key found!`)
	}
	const response = await fetch(WATCHING_ENDPOINT, {
		headers: {
			'content-type': 'application/json',
			'trakt-api-version': '2',
			'trakt-api-key': TRAKT_CLIENT_ID,
		},
		next: { revalidate: 1320 },
	})
	if (response.status === 204) {
		return {
			status: response.status,
		}
	}

	try {
		const watching = await response.json()

		return {
			status: response.status,
			data: watching,
		}
	} catch (error) {
		return {
			status: response.status,
		}
	}
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
		next: { revalidate: 1320 },
	})

	const stats = (await response.json()) as TraktMovie[]

	const ids = stats
		.map((movie: { movie: { ids: { tmdb: number } } }) => {
			return {
				tmdb: movie.movie.ids.tmdb,
			}
		})
		.filter(
			(movie: { tmdb: number }, index: number, self: any[]) =>
				self.findIndex((s: { tmdb: number }) => s.tmdb === movie.tmdb) === index
		)
		.slice(0, 10)

	const movies = await Promise.all(
		ids.map(async (id: { tmdb: number }) => {
			const tmdb = await getTMDBData(id.tmdb, 'movies')
			const tmdbJson = await tmdb.json()
			const title: string = tmdbJson.title
			const poster = `https://image.tmdb.org/t/p/original${tmdbJson.poster_path}`
			const url = `https://www.themoviedb.org/movie/${id.tmdb}`
			return {
				title,
				poster,
				url,
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
		next: { revalidate: 1320 },
	})

	const stats = (await response.json()) as TraktShow[]

	const ids = stats
		.map((show: { show: { ids: { tmdb: number } } }) => {
			return {
				tmdb: show.show.ids.tmdb,
			}
		}, [])
		.filter(
			(show: { tmdb: number }, index: number, self: any[]) =>
				self.findIndex((s: { tmdb: number }) => s.tmdb === show.tmdb) === index
		)
		.slice(0, 10)

	const shows = await Promise.all(
		ids.map(async (id: { tmdb: number }) => {
			const tmdb = await getTMDBData(id.tmdb, 'shows')
			const tmdbJson = await tmdb.json()
			const title: string = tmdbJson.name
			const poster = `https://image.tmdb.org/t/p/original${tmdbJson.poster_path}`
			const url = `https://www.themoviedb.org/tv/${id.tmdb}`
			return {
				title,
				poster,
				url,
			}
		})
	)

	return shows
}
