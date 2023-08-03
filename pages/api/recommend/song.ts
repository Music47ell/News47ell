import { getAccessToken } from '@/lib/spotify'
import { db, songRecommendationsTable } from '@/lib/turso'

const RECOMMEND_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${process.env.NEXT_PUBLIC_SPOTIFY_RECOMMENDATIONS_PLAYLIST_ID}/tracks`

export default async function handler(
	req: { body: string; query: { uri: string; url: string } },
	res: { statusCode: number; end: () => void }
) {
	const body = JSON.parse(req.body)
	const { access_token } = await getAccessToken()

	if (req.query.uri.substring(0, 14) === 'spotify:track:' && !req.query.uri.includes(',')) {
		await db
			.insert(songRecommendationsTable)
			.values({
				email: body.email,
				note: body.note,
				songTitle: body.songTitle,
				spotifyUri: req.query.uri,
				spotifyUrl: req.query.url,
			})
			.returning()
			.get()

		const getTracks = await fetch(RECOMMEND_PLAYLIST_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${access_token}}`,
			},
		}).then((res) => res.json())

		const ids = getTracks.items.map((song: { track: { id: string } }) => song.track.id)

		if (!ids.includes(req.query.uri.substring(14))) {
			await fetch(`${RECOMMEND_PLAYLIST_ENDPOINT}?uris=${req.query.uri}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${access_token}}`,
				},
			}).then((res) => res.json())
		}
	}

	res.statusCode = 200
	res.end()
}
