// https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:4321&scope=user-read-currently-playing%20user-top-read%20user-read-recently-played%20user-library-read
// curl -H "Authorization: Basic <base64 encoded client_id:client_secret>" -d grant_type=authorization_code -d code=<code> -d redirect_uri=http%3A%2F%2Flocalhost:3000 https://accounts.spotify.com/api/token

import type { Song, Episode, Track, Podcast } from './types'

const client_id = import.meta.env.SPOTIFY_CLIENT_ID
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET
const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing?additional_types=track%2Cepisode`
const RECENT_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=10`
const SHOWS_ENDPOINT = `https://api.spotify.com/v1/me/shows?limit=10`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?limit=10`
const TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists?limit=10'

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

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
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
	})

	return response.json()
}

export type NowPlayingResponse = {
	is_playing: boolean
	currently_playing_type: 'episode' | 'track'
	item: Episode | Track
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
		const nowPlaying = (await response.json()) as NowPlayingResponse

		return {
			status: response.status,
			data: nowPlaying,
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
	})
	const { items } = (await response.json()) as RecentTracks

	const recentTracks = items.map(({ track }) => ({
		artist: track.artists ? track.artists.map((_artist) => _artist.name).join(', ') : '',
		songUrl: track.external_urls?.spotify,
		audioUrl: track?.preview_url,
		title: track?.name,
		album: track.album?.name,
		albumImage: track.album?.images[0].url,
	})) as Song[]

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
	})
	const { items } = (await response.json()) as TopTracks

	const topTracks = items.map((track) => ({
		artist: track.artists.map((_artist) => _artist.name).join(', '),
		songUrl: track.external_urls.spotify,
		audioUrl: track.preview_url,
		title: track.name,
		album: track.album.name,
		albumImage: track.album.images[0].url,
	})) as Song[]

	return topTracks
}

type TopArtists = {
	items: {
		name: string
		artists: {
			name: string
		}
		images: {
			url: string
		}[]
		external_urls: {
			spotify: string
		}
		preview_url: string
	}[]
}

export const getTopArtists = async () => {
	const { access_token } = await getAccessToken()

	const response = await fetch(TOP_ARTISTS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		next: { revalidate: 60 },
	})
	const { items } = (await response.json()) as TopArtists

	const topArtists = items.map((artist) => ({
		artist: artist.name,
		songUrl: artist.external_urls.spotify,
		audioUrl: artist.preview_url,
		title: artist.name,
		albumImage: artist.images[0].url,
	})) as Song[]

	return topArtists
}

type SubscribedShows = {
	items: {
		show: {
			name: string
			publisher: string
			images: { url: string }[]
			external_urls: {
				spotify: string
			}
		}
	}[]
}

export const getSubscribedShows = async () => {
	const { access_token } = await getAccessToken()
	const response = await fetch(SHOWS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})
	const { items } = (await response.json()) as SubscribedShows

	const subscribedShows = items.map(({ show }) => ({
		podcastUrl: show.external_urls?.spotify,
		title: show.name,
		podcastImage: show.images[0].url,
	})) as Podcast[]

	return subscribedShows
}
