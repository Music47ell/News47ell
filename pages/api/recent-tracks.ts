import type { NextApiRequest, NextApiResponse } from 'next'
import { getRecentTracks } from 'lib/spotify'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const response = await getRecentTracks()
	const { items } = await response.json()

	const tracks = items.slice(0, 10).map(({ track }) => ({
		artist: track.artists.map((_artist) => _artist.name).join(', '),
		songUrl: track.external_urls.spotify,
		audioUrl: track.preview_url,
		title: track.name,
		album: track.album.name,
		albumImage: track.album.images[0].url,
	}))

	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

	return res.status(200).json({ tracks })
}
