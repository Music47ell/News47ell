/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, ReactNode } from 'react'

import Pagination from '@/components/blog/Pagination'
import type { Blog, Page } from '@/contentlayer/generated'
import { CoreContent } from '@/lib/contentlayer'
import { MDXDocument, Toc } from '@/lib/types'

export interface Layout {
	posts: CoreContent<Blog>[]
	title: string
	initialDisplayPosts?: CoreContent<Blog>[]
	pagination?: ComponentProps<typeof Pagination>
}

export interface MDXLayout {
	content: MDXDocument
	[key: string]: unknown
}

export interface IPageTitle {
	children: ReactNode
}

export interface IPagination {
	totalPages: number
	currentPage: number
}

export interface IPostLayout {
	content: CoreContent<Blog>
	//related: Post[]
	next?: { slug: string; title: string }
	prev?: { slug: string; title: string }
	children: ReactNode
}

export interface IPageLayout {
	content: CoreContent<Page>
	children: ReactNode
}

export interface IPostDate {
	published_at: string
	updated_at: string
	firstCommitHash: string
	lastCommitHash: string
	slug: string
	isCommitDataLoading: boolean
}

export interface ICommitData {
	firstCommitDate?: string
	lastCommitDate?: string
	firstCommitHash?: string
	lastCommitHash?: string
	isCommitDataLoading: boolean
	isError: string
}

export interface IResumeLayout {
	basics: {
		name: string
		label: string
		image: string
		email: string
		url: string
		summary: string
		location: {
			country: string
			countryCode: string
		}
		profiles: {
			id: number
			network: string
			username: string
			url: string
		}[]
	}
	education: {
		id: number
		institution: string
		url: string
		area: string
	}[]
	skills: {
		id: number
		name: string
		keywords: string[]
	}[]
	languages: {
		id: number
		language: string
		fluency: string
	}[]
	certificates: {
		id: number
		name: string
		date: string
		issuer: string
		url: string
	}[]
}

export interface IPre {
	children: ReactNode
}

export interface ISectionContainer {
	children: ReactNode
}

export interface CommonSEOProps {
	title: string
	description: string
	ogType: string
	ogImage: string
	twImage: string
	canonicalUrl?: string
}

export interface PageSEOProps {
	title: string
	description: string
	url?: string
}

export interface BlogSeoProps extends CoreContent<Blog> {
	url: string
	canonicalUrl?: string
}

export interface IShare {
	title: string
	slug: string
}

export interface Taxonomy {
	text: string
}

export interface TOCInlineProps {
	toc: Toc
	indentDepth?: number
	fromHeading?: number
	toHeading?: number
	asDisclosure?: boolean
	exclude?: string | string[]
}
