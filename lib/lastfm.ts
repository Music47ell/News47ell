import 'server-only'

import siteMetadata from '@/data/siteMetadata'
import { Lastfm } from '@/lib/types'
const LASTFM_API_KEY = process.env.LASTFM_API_KEY

const STATS_ENDPOINT = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${siteMetadata.author.username}&api_key=${LASTFM_API_KEY}&format=json`

export const getStats = async () => {
	if (LASTFM_API_KEY === null || LASTFM_API_KEY === undefined) {
		throw new Error(`No Trakt API key found!`)
	}
	const response = await fetch(STATS_ENDPOINT)

	const stats = (await response.json()) as Lastfm

	return stats
}
