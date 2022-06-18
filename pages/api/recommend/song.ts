import { getAccessToken } from '@/lib/spotify'

const RECOMMEND_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${process.env.NEXT_PUBLIC_SPOTIFY_RECOMMENDATIONS_PLAYLIST_ID}/tracks`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(
  req: { body: string; query: { uri: string } },
  res: { statusCode: number; end: () => void }
) {
  const body = JSON.parse(req.body)
  const { access_token } = await getAccessToken()

  if (req.query.uri.substring(0, 14) === 'spotify:track:' && !req.query.uri.includes(',')) {
    await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/song-recommendation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        note: body.note,
        email: body.email,
        'song-title': body.songTitle,
        'spotify-uri': req.query.uri,
      }),
    }).catch((error) => console.log(error))

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
