import type { Document, MDX } from 'contentlayer/core'

export type MDXDocument = Document & { body: MDX }

export type Views = {
	views: number
}

export type PostView = {
	slug: string
	count: string
}

export type WebMention = {
	source: string
	verified: boolean
	verified_date: string
	private: boolean
	data: {
		author: {
			name: string
			url: string
			photo: string
		}
		url: string
		name: string
		content: string
		published: string
	}
	activity: {
		type: 'link' | 'reply' | 'repost' | 'like'
		sentence: string
		sentence_html: string
	}
	target: string
}

export type Toc = {
	value: string
	depth: number
	url: string
}[]
