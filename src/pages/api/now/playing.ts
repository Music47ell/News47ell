import type { APIContext } from 'astro'
import { getNowPlaying } from '@/libs/spotify'
import type { Episode, Track } from '@/libs/types'

export async function GET() {
	try {
		const response = await getNowPlaying()
		const { data, status } = response

		if (status === 204 || status > 400 || !data || data.currently_playing_type === null) {
			return Response.json({ isPlaying: false })
		}

		const { currently_playing_type, item, is_playing } = data

		const commonFields = {
			isPlaying: is_playing,
			playingType: currently_playing_type,
		}

		if (currently_playing_type === 'episode') {
			const episode = item as Episode
			const { name, show, external_urls, images } = episode

			const episodeImageUrl =
				images.find((image) => image.height === 640)?.url ||
				show.images.find((image) => image.height === 640)?.url

			return Response.json({
				...commonFields,
				title: name,
				show: show.name,
				url: external_urls.spotify,
				image: episodeImageUrl,
			})
		} else if (currently_playing_type === 'track') {
			const track = item as Track
			const { name, artists, album, external_urls } = track

			const albumImageUrl = album.images.find((image) => image.height === 640)?.url

			return Response.json({
				...commonFields,
				title: name,
				artist: artists.map((_artist) => _artist.name).join(', '),
				album: album.name,
				image: albumImageUrl,
				url: external_urls.spotify,
			})
		} else {
			return Response.json({ isPlaying: false })
		}
	} catch {
		return Response.json({ isPlaying: false }, { status: 500 })
	}
}
