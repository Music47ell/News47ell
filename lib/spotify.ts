// scope=user-read-currently-playing%20 user-top-read%20user-read-recently-played
//import 'server-only'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const RECENT_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=10`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?limit=10`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const RECOMMEND_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${process.env.NEXT_PUBLIC_SPOTIFY_RECOMMENDATIONS_PLAYLIST_ID}/tracks`

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

export const getAccessToken = async () => {
	const searchParams = new URLSearchParams()
	searchParams.append('grant_type', 'refresh_token')
	searchParams.append('refresh_token', refresh_token as string)

	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: searchParams.toString(),
	})

	return response.json()
}

type Song = {
	is_playing: boolean
	item: {
		name: string
		artists: {
			name: string
		}[]
		album: {
			name: string
			images: {
				url: string
			}[]
		}
		external_urls: {
			spotify: string
		}
	}
}

export const getNowPlaying = async () => {
	const { access_token } = await getAccessToken()

	const response = await fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})
	if (response.status === 204) {
		return {
			status: response.status,
		}
	}

	try {
		const song = (await response.json()) as Song

		return {
			status: response.status,
			data: song,
		}
	} catch {
		return {
			status: response.status,
		}
	}
}

type RecentTracks = {
	items: {
		track: {
			name: string
			artists: {
				name: string
			}[]
			album: {
				name: string
				images: { url: string }[]
			}
			external_urls: {
				spotify: string
			}
			preview_url: string
		}
	}[]
}

export const getRecentTracks = async () => {
	const { access_token } = await getAccessToken()
	const response = await fetch(RECENT_TRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		next: { revalidate: 60 },
	})
	const recentTracks = (await response.json()) as RecentTracks

	return recentTracks
}

type TopTracks = {
	items: {
		name: string
		artists: {
			name: string
		}[]
		album: {
			name: string
			images: { url: string }[]
		}
		external_urls: {
			spotify: string
		}
		preview_url: string
	}[]
}

export const getTopTracks = async () => {
	const { access_token } = await getAccessToken()

	const response = await fetch(TOP_TRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		next: { revalidate: 60 },
	})
	const topTracks = (await response.json()) as TopTracks

	return topTracks
}

export const getTracksUri = async () => {
	const response = await fetch(RECOMMEND_PLAYLIST_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${refresh_token}`,
		},
	}).then((res) => res.json())

	return response
}
