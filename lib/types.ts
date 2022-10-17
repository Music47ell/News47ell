import { ReactNode } from 'react'

export type AuthorFrontMatter = {
	id: string
	name: string
	bio: string
	avatar: string
	email: string
	twitter: string
}

export type CodeStats = {
	total_xp: number
	new_xp: number
	user: string
	url: string
}

export interface CodeStatsCard {
	link: string
	totalXP: number
	previousXP: number
	newXP: number
	level: number
	user: string
	isLoading: boolean
	isError: string | undefined
}

export type Error = { message: string }

export type Icons = {
	className?: string
	children?: ReactNode
	kind: string
	href?: string
	w?: number | string
	h?: number | string
}

export type TLanguage = {
	ranking: number
	name: string
	xps: number
}

export type Bookmark = {
	bookmarks: RaindropCard[]
	tags: string[]
	isLoading: boolean
	isError: string | undefined
}

export type RaindropCard = {
	link: string
	title: string
	cover: string
	lastUpdate: string
	tags: string[]
}

export type RaindropStats = {
	items: Array<{
		_id: string
		count: number
	}>
	meta: {
		changedBookmarksDate: string
	}
}

export type RaindropStatsCard = {
	bookmarksCount: number
	lastUpdate: string
	isLoading: boolean
	isError: string
}

export type PostFrontMatter = {
	id: string
	title: string
	published_at: string
	updated_at: string
	tags?: string[]
	category: string
	published?: boolean
	description?: string
	cover?: string[]
	author?: {
		id: string
		username: string
		first_name: string
		last_name: string
		slug: string
		email: string
		avatar: string
		avatar_url: string
		twitter: string
	}
	layout?: string
	slug: string
	linked?: string
	wordCount?: number
	readingTime?: number
}

export type Quote = {
	text: string
	link?: string
	className?: string
}

export type NowWatchingRelease = {
	poster: string
	episodeTitle: string
	title: string
	isWatching: boolean
}

export type TraktRelease = {
	ranking: number
	id: number
	title: string
	link: string
	poster: string
	trailer: string
}

export type Response<T> = T | Error

export type Song = {
	ranking: number
	songUrl: string
	audioUrl: string
	artist: string
	title: string
	album: string
	albumImage: string
	isPlaying: boolean
	onToggle: () => void
}

export type StatsCard = {
	name: number
	percentage: number
	code: number
	nFiles: number
	textColor: string
	barColor: string
}

export type TotalStatsCard = {
	blank: number
	comment: number
	code: number
	files: number
}

export interface TraktCard {
	moviesWatched: number
	showsWatched: number
	moviesMinutes: number
	showsMinutes: number
	episodesWatched: number
	user: string
	url: string
	isLoading: boolean
	isError: string
}

export type NowPlayingSong = {
	album: string
	albumImageUrl: string
	artist: string
	isPlaying: boolean
	songUrl: string
	title: string
}

export type Tracks = {
	tracks: Track[]
}

export type Track = {
	songUrl: string
	audioUrl: string
	artist: string
	title: string
	album: string
	albumImage: string
}

export type Lyrics = {
	id: number
	band: string
	song: string
	lyric: string
}[]

export type Quotes = {
	id: number
	source: string
	link: string
	quote: string
}[]

export type ProjectBreakdown = {
	codeStats: []
	Header: ProjectBreakdownHeader
	JavaScript: ProjectBreakdownLanguage
	TypeScript: ProjectBreakdownLanguage
	JSON: ProjectBreakdownLanguage
	YAML: ProjectBreakdownLanguage
	SQL: ProjectBreakdownLanguage
	TOML: ProjectBreakdownLanguage
	SUM: ProjectBreakdownLanguage
}

export type ProjectBreakdownHeader = {
	cloc_url: string
	cloc_version: string
	elapsed_seconds: number
	n_files: number
	n_lines: number
	files_per_second: number
	lines_per_second: number
}

export type ProjectBreakdownLanguage = {
	nFiles: number
	blank: number
	comment: number
	code: number
}

export type Languages = {
	languages: Language[]
}

export type Language = {
	ranking: number
	name: string
	xps: number
}

export type Trakt = {
	movies: TraktItem
	shows: TraktItem
	seasons: TraktItem
	episodes: TraktItem
	network: Network
	ratings: Rating
	user: string
	url: string
}

export type TraktItem = {
	id: number
	title: string
	ranking: number
	link: string
	poster: string
	trailer: string
	plays?: number
	watched?: number
	minutes?: number
	collected?: number
	ratings?: number
	comments?: number
}

export type Network = {
	friends: number
	followers: number
	following: number
}

export type Distribution = {
	1: number
	2: number
	3: number
	4: number
	5: number
	6: number
	7: number
	8: number
	9: number
	10: number
}

export type Rating = {
	total: number
	distribution: Distribution
}

export type ITraktCard = {
	header: string
	watched: number
	episodes?: number
	minutes: number
	footer?: string
	ttMessage: number
}

export type WatchedMovies = {
	movies: TraktItem[]
}

export type WatchedShows = {
	shows: TraktItem[]
}

export type Views = {
	views: number
}

export type UseViewCountResult = {
	views?: number
	isLoading: boolean
}

export type Reactions = {
	like_count: number
	dislike_count: number
}

export type LikeReaction = {
	likes: number
	userLikes: boolean
}

export type UseLikeCountResult = {
	toggleUserLike: () => void
	userLikes: boolean | undefined
	likes: number | undefined
	isLoadingLikes: boolean
}

export type DislikeReaction = {
	dislikes: number
	userDislikes: boolean
}

export type UseDislikeCountResult = {
	toggleUserDislike: () => void
	userDislikes: boolean | undefined
	dislikes: number | undefined
	isLoadingDislikes: boolean
}

export type PostsSearchResult = {
	id: string
	title: string
	updatedAt: string
	slug: string
}

export type Lastfm = {
	user: {
		playcount: number
		registered: {
			'#text': number
		}
		url: string
		name: string
	}
}

export type OGMeta = {
	meta: {
		site?: {
			name: string
			favicon?: string
		}
		title?: string
		description?: string
		image?: {
			url: string
		}
		url?: string
	}
}
