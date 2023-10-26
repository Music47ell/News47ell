import 'server-only'

import siteMetadata from '@/data/siteMetadata'
import { RecentTracks } from '@/lib/types'

const LASTFM_API_KEY = process.env.LASTFM_API_KEY

const NOW_PLAYING_ENDPOINT = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${siteMetadata.author.username}&api_key=${LASTFM_API_KEY}&format=json&limit=1`

export const getNowPlaying = async () => {
	if (LASTFM_API_KEY === null || LASTFM_API_KEY === undefined) {
		throw new Error(`No Trakt API key found!`)
	}

	const response = await fetch(NOW_PLAYING_ENDPOINT)

	const nowPlaying = (await response.json()) as RecentTracks

	return nowPlaying
}
