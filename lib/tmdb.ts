import siteMetadata from '@/data/siteMetadata'

const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN

export const getTMDBMovies = async (id: number) => {
	if (TMDB_API_TOKEN === null || TMDB_API_TOKEN === undefined) {
		throw new Error(`No TMDB API key found!`)
	}

	const TMDB_MOVIES_ENDPOINT = `https://api.themoviedb.org/3/movie/${id}?language=${siteMetadata.locale}&append_to_response=videos`

	return fetch(TMDB_MOVIES_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${TMDB_API_TOKEN}`,
			'Content-Type': 'application/json;charset=utf-8',
		},
	})
}

export const getTMDBShows = async (id: number) => {
	if (TMDB_API_TOKEN === null || TMDB_API_TOKEN === undefined) {
		throw new Error(`No TMDB API key found!`)
	}

	const TMDB_SHOWS_ENDPOINT = `https://api.themoviedb.org/3/tv/${id}?language=${siteMetadata.locale}&append_to_response=videos`

	return fetch(TMDB_SHOWS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${TMDB_API_TOKEN}`,
			'Content-Type': 'application/json;charset=utf-8',
		},
	})
}
