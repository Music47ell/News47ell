import type { NextApiRequest, NextApiResponse } from 'next'
import { getClientCredentialToken } from '@/lib/spotify'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { query } = req.query
	const { access_token } = await getClientCredentialToken()
	const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	}).then((fetchResponse) => fetchResponse.json())

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const mapToSongList = (items: any[]) =>
		items.map(
			(item: {
				name: string
				external_urls: { spotify: string }
				artists: { name: string; external_urls: { spotify: string } }[]
				uri: string
				album: { images: { url: string }[] }
				preview_url: string
			}) => ({
				title: item.name,
				url: item.external_urls.spotify,
				artists: item.artists.map(
					(artist: { name: string; external_urls: { spotify: string } }) => ({
						name: artist.name,
						url: artist.external_urls.spotify,
					})
				),
				uri: item.uri,
				image: item.album.images[0].url,
				preview: item.preview_url,
			})
		)

	res.statusCode = 200
	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify(mapToSongList(response.tracks.items)))
}
