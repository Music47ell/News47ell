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
