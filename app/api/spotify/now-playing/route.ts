import { getNowPlaying } from 'lib/spotify'
import { Episode, Track } from 'lib/types'
import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const fetchCache = 'force-no-store'

export const GET = async () => {
	try {
		const response = await getNowPlaying()

		if (
			response.status === 204 ||
			response.status > 400 ||
			response?.data?.currently_playing_type === null ||
			!response.data
		) {
			return NextResponse.json({ isPlaying: false })
		}

		const playingType = response.data.currently_playing_type

		if (playingType === 'episode') {
			// Handle episode case
			const episode = response.data.item as Episode
			const isPlaying = response.data.is_playing
			const title = episode.name
			const show = episode.show.name
			const episodeUrl = episode.external_urls.spotify
			const episodeImageUrl = episode.images[0]?.url || episode.show.images[0]?.url

			return NextResponse.json({
				isPlaying,
				playingType,
				title,
				show,
				episodeUrl,
				episodeImageUrl,
			})
		} else if (playingType === 'track') {
			// Handle track case
			const track = response.data.item as Track
			const isPlaying = response.data.is_playing
			const title = track.name
			const artist = track.artists.map((_artist) => _artist.name).join(', ')
			const album = track.album.name
			const albumImageUrl = track.album.images[0].url
			const songUrl = track.external_urls.spotify

			return NextResponse.json({
				isPlaying,
				playingType,
				title,
				artist,
				album,
				albumImageUrl,
				songUrl,
			})
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
