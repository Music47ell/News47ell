// scope=user-read-currently-playing%20 user-top-read%20user-read-recently-played

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const RECENT_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const RECOMMEND_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${process.env.NEXT_PUBLIC_SPOTIFY_RECOMMENDATIONS_PLAYLIST_ID}/tracks`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getClientCredentialToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basic}`,
    },
  })

  return response.json()
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return response.json()
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getRecentTracks = async () => {
  const { access_token } = await getAccessToken()

  return fetch(RECENT_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getTopTracks = async () => {
  const { access_token } = await getAccessToken()

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getTracksUri = async () => {
  const response = await fetch(RECOMMEND_PLAYLIST_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  }).then((res) => res.json())

  return response
}
