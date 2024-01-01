import siteMetadata from '@/data/siteMetadata'
import { Lastfm } from '@/libs/types'
import { displayNumbers } from '@/utils/formatters'
const LASTFM_API_KEY = import.meta.env.LASTFM_API_KEY

const STATS_ENDPOINT = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${siteMetadata.author.username}&api_key=${LASTFM_API_KEY}&format=json`

export const getStats = async () => {
	if (LASTFM_API_KEY === null || LASTFM_API_KEY === undefined) {
		throw new Error('No Trakt API key found!')
	}
	const response = await fetch(STATS_ENDPOINT)

	const { user } = (await response.json()) as Lastfm

	const { name, url, artist_count, playcount, track_count } = user as Lastfm['user']
	const registered = user.registered['#text']
	const registeredDate = new Date().getFullYear() - new Date(registered * 1000).getFullYear()
	const days = Math.round(
		(new Date().getTime() - new Date(registered * 1000).getTime()) / (1000 * 60 * 60 * 24)
	)
	const averagePlayCount = Math.round(playcount / days)

	return {
		name,
		url,
		artistsCount: artist_count,
		playCount: playcount,
		tracksCount: track_count,
		registeredDate,
		averagePlayCount,
	}
}
