import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import type { Blog } from '@/contentlayer/generated'
import { allBlogs } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { getContent } from '@/lib/contentlayer'

import BlogPost from './BlogPost'

// https://beta.nextjs.org/docs/api-reference/segment-config
export const dynamicParams = false

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export async function generateStaticParams() {
	return allBlogs.map((post) => ({
		slug: post.slug,
	}))
}

export async function generateMetadata({ params }): Promise<Metadata | undefined> {
	const post = allBlogs.find((post) => post.slug === params.slug)
	if (!post) {
		return
	}

	const { title, published_at: publishedTime, description: description, slug } = post
	const ogImage = `${siteMetadata.siteUrl}/api/og/image?title=${encodeURIComponent(title)}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `${siteMetadata.siteUrl}/blog/${slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
		alternates: {
			canonical: `${siteMetadata.siteUrl}/blog/${slug}`,
			types: {
				'application/rss+xml': `${siteMetadata.siteUrl}/blog/feed.xml`,
				'application/json': `${siteMetadata.siteUrl}/blog/feed.json`,
			},
		},
	}
}

export default function Post({ params }: { params: { slug: string } }) {
	const slug = params.slug as string
	const sortedPosts = getContent(allBlogs) as Blog[]
	const post = sortedPosts.find((post) => post.slug === slug)

	if (!post) {
		notFound()
	}

	const { source, title, published_at, updated_at, readingTime, wordsCount, structuredData } = post

	return (
		<BlogPost
			source={source}
			title={title}
			publishedAt={published_at}
			updatedAt={updated_at}
			readingTime={readingTime}
			wordsCount={wordsCount}
			slug={slug}
			post={post}
			structuredData={structuredData}
		/>
	)
}
