import { getNowPlaying } from 'lib/spotify'
import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const fetchCache = 'force-no-store'

export const GET = async () => {
	try {
		const response = await getNowPlaying()

		if (
			response.status === 204 ||
			response.status > 400 ||
			response?.data?.item === null ||
			!response.data
		) {
			return NextResponse.json({ isPlaying: false })
		}

		const song = response.data

		// Don't show song if it is paused
		if (song.is_playing === false) {
			return NextResponse.json({ isPlaying: false })
		}

		const isPlaying = song.is_playing
		const title = song.item.name
		const artist = song.item.artists.map((_artist) => _artist.name).join(', ')
		const album = song.item.album.name
		const albumImageUrl = song.item.album.images[0].url
		const songUrl = song.item.external_urls.spotify

		return NextResponse.json({
			isPlaying,
			title,
			artist,
			album,
			albumImageUrl,
			songUrl,
		})
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
