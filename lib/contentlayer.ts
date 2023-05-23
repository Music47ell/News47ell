import { pick } from 'contentlayer/client'

import type { Blog, Page } from '@/contentlayer/generated'
import { allBlogs } from '@/contentlayer/generated'
import { MDXDocument } from '@/lib/types'
import { dateSortDesc } from '@/utils/sort-by-date'

export const getContent = (content: Blog[] | Page[]) => {
	return content.sort((a: { published_at: string }, b: { published_at: string }) =>
		dateSortDesc(a.published_at, b.published_at)
	)
}

export const getBlogHomepage = () => {
	const posts = allBlogs.map((post) =>
		pick(post, [
			'_id',
			'slug',
			'title',
			'description',
			'published_at',
			'updated_at',
			'readingTime',
			'wordsCount',
		])
	)

	return posts.sort((a: { published_at: string }, b: { published_at: string }) =>
		dateSortDesc(a.published_at, b.published_at)
	)
}

/**
 * A typesafe omit helper function
 * @example omit(content, ['body', '_raw', '_id'])
 *
 * @param {Obj} obj
 * @param {Keys[]} keys
 * @return {*}  {Omit<Obj, Keys>}
 */
export const omit = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Omit<Obj, Keys> => {
	const result = Object.assign({}, obj)
	keys.forEach((key) => {
		delete result[key]
	})
	return result
}

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>

export function coreContent<T extends MDXDocument>(content: T) {
	return omit(content, ['body', '_raw', '_id'])
}

export function allCoreContent<T extends MDXDocument>(contents: T[]) {
	return contents.map((c) => coreContent(c)).filter((c) => !('draft' in c && c.draft === true))
}
