'use client'

import { notFound } from 'next/navigation'

import { allBlogs } from '@/contentlayer/generated'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, allTags } from '@/lib/contentlayer'
import kebabCase from '@/utils/kebab-case'

// https://beta.nextjs.org/docs/api-reference/segment-config
export const dynamicParams = false

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export async function generateStaticParams() {
	const tags = await allTags()
	return Object.keys(tags).map((tag) => ({
		params: {
			tag,
		},
	}))
}

export default function Tag({ params }) {
	const tag = params.tag as string
	const filteredPosts = allCoreContent(
		allBlogs.filter(
			(post) => post.draft !== true && post.tags.map((t: string) => kebabCase(t)).includes(tag)
		)
	)

	if (!tag) {
		notFound()
	}

	const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

	return <ListLayout posts={filteredPosts} title={`Posts tagged with ${title}`} />
}
