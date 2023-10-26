import siteMetadata from '@/data/siteMetadata'
import { getTMDBData } from '@/lib/tmdb'

const TRAKT_CLIENT_ID = process.env.TRAKT_CLIENT_ID

const WATCHING_ENDPOINT = `https://api.trakt.tv/users/${siteMetadata.author.username}/watching`

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
