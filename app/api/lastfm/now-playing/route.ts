import { getNowPlaying } from 'lib/lastfm'
import { NextResponse } from 'next/server'

import { RecentTracks } from '@/lib/types'

export const runtime = 'edge'
export const fetchCache = 'force-no-store'

export const GET = async () => {
	try {
		const { recenttracks } = await getNowPlaying()
		const { track } = recenttracks
		if (track.length > 0) {
			const [nowPlaying] = track
			const isPlaying = nowPlaying['@attr']?.nowplaying === 'true'
			const title = nowPlaying.name
			const artist = nowPlaying.artist['#text']
			const album = nowPlaying.album['#text']
			const image = nowPlaying.image[3]['#text']
			const url = nowPlaying.url

			const response = {
				isPlaying,
				title,
				artist,
				album,
				image,
				url,
			}
			return NextResponse.json(response)
		} else {
			// Handle other playing types if needed
			return NextResponse.json({ isPlaying: false })
		}
	} catch {
		return NextResponse.json(
			{
				isPlaying: false,
				message: 'Error getting Now Playing from Spotify',
			},
			{ status: 500 }
		)
	}
}
