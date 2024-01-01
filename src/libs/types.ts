export type Episode = {
	name: string
	images: {
		url: string
	}
	show: {
		name: string
		images: {
			url: string
		}
	}
	external_urls: {
		spotify: string
	}
}

export type Track = {
	name: string
	artists: {
		name: string
	}[]
	album: {
		name: string
		images: {
			height: number
			width: number
			url: string
		}[]
	}
	external_urls: {
		spotify: string
	}
}

export type Song = {
	songUrl: string
	artist: string
	title: string
	album?: string
	albumImage: string
}

export type Podcast = {
	podcastUrl: string
	title: string
	show: string
	podcastImage: string
}

export type CodeStats = {
	total_xp: number
	previous_xp: number
	new_xp: number
	level: number
	user: string
	url: string
}

export type Languages = {
	languages: Language[]
}

export type Language = {
	ranking: number
	name: string
	xps: number
}

export type Lastfm = {
	user: {
		playcount: number
		artist_count: number
		track_count: number
		registered: {
			'#text': number
		}
		url: string
		name: string
	}
}
