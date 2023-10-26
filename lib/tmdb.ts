import siteMetadata from '@/data/siteMetadata'

const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN

export const getTMDBData = async (id: number, type: 'movies' | 'shows') => {
	if (TMDB_API_TOKEN === null || TMDB_API_TOKEN === undefined) {
		throw new Error(`No TMDB API key found!`)
	}

	const endpoint =
		type === 'movies'
			? `https://api.themoviedb.org/3/movie/${id}?language=${siteMetadata.locale}&append_to_response=videos`
			: `https://api.themoviedb.org/3/tv/${id}?language=${siteMetadata.locale}&append_to_response=videos`

	return fetch(endpoint, {
		headers: {
			Authorization: `Bearer ${TMDB_API_TOKEN}`,
			'Content-Type': 'application/json;charset=utf-8',
		},
	})
}
