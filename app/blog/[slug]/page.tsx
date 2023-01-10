'use client'

import { notFound } from 'next/navigation'

import { MDXLayoutRenderer } from '@/components/MDXComponents'
import type { Blog } from '@/contentlayer/generated'
import { allBlogs } from '@/contentlayer/generated'
import PostLayout from '@/layouts/PostLayout'
import { coreContent, getContent } from '@/lib/contentlayer'

// https://beta.nextjs.org/docs/api-reference/segment-config
export const dynamicParams = false

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export async function generateStaticParams() {
	return allBlogs.map((post) => ({
		slug: post.slug,
	}))
}

export default function Post({ params }) {
	const slug = params.slug as string
	const sortedPosts = getContent(allBlogs) as Blog[]
	const postIndex = sortedPosts.findIndex((post) => post.slug === slug)
	const prevContent = sortedPosts[postIndex + 1] || null
	const prev = prevContent ? coreContent(prevContent) : null
	const nextContent = sortedPosts[postIndex - 1] || null
	const next = nextContent ? coreContent(nextContent) : null
	const post = sortedPosts.find((post) => post.slug === slug)

	if (!post) {
		notFound()
	}

	return (
		<PostLayout content={post} prev={prev} next={next}>
			<MDXLayoutRenderer content={post} toc={post?.toc} prev={prev} next={next} />
		</PostLayout>
	)
}
