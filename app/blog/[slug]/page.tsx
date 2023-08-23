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

	const { title, published_at: publishedTime, updated_at: modifiedTime, description, slug } = post
	const ogImage = `${siteMetadata.siteUrl}/api/og/image?title=${encodeURIComponent(title)}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			modifiedTime,
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

	const { source, title, cover, published_at, updated_at, readingTime, wordsCount, description } =
		post

	const ogImage = cover
		? `${siteMetadata.siteUrl}${cover.filePath.replace('../public', '')}`
		: `${siteMetadata.siteUrl}/api/og/image?title=${encodeURIComponent(title)}`

	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Article',
				'@id': `${siteMetadata.siteUrl}/blog/${slug}`,
				isPartOf: {
					'@id': `${siteMetadata.siteUrl}/blog/${slug}`,
				},
				author: {
					name: siteMetadata.author.name,
					'@id': siteMetadata.siteUrl,
				},
				headline: title,
				datePublished: published_at,
				dateModified: updated_at,
				mainEntityOfPage: {
					'@id': `${siteMetadata.siteUrl}/blog/${slug}`,
				},
				wordCount: wordsCount,
				publisher: {
					'@id': siteMetadata.siteUrl,
				},
				image: {
					'@id': ogImage,
				},
				thumbnailUrl: ogImage,
				inLanguage: siteMetadata.locale,
			},
			{
				'@type': 'WebPage',
				'@id': `${siteMetadata.siteUrl}/blog/${slug}`,
				url: `${siteMetadata.siteUrl}/blog/${slug}`,
				name: title,
				isPartOf: {
					'@id': `${siteMetadata.siteUrl}/blog/${slug}`,
				},
				primaryImageOfPage: {
					'@id': ogImage,
				},
				image: {
					'@id': ogImage,
				},
				thumbnailUrl: ogImage,
				datePublished: published_at,
				dateModified: updated_at,
				description: description,
				inLanguage: siteMetadata.locale,
				potentialAction: [
					{
						'@type': 'ReadAction',
						target: [`${siteMetadata.siteUrl}/blog/${slug}`],
					},
				],
			},
			{
				'@type': 'ImageObject',
				inLanguage: 'en-US',
				'@id': ogImage,
				url: ogImage,
				contentUrl: ogImage,
				width: 1200,
				height: 628,
				caption: title,
			},
			{
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Blog',
						item: siteMetadata.siteUrl,
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: title,
					},
				],
			},
			{
				'@type': 'WebSite',
				'@id': siteMetadata.siteUrl,
				url: siteMetadata.siteUrl,
				name: siteMetadata.title,
				description: siteMetadata.description,
				publisher: {
					'@id': siteMetadata.siteUrl,
				},
				inLanguage: 'en-US',
			},
			{
				'@type': 'Organization',
				'@id': siteMetadata.siteUrl,
				name: siteMetadata.title,
				url: siteMetadata.siteUrl,
				logo: {
					'@type': 'ImageObject',
					inLanguage: siteMetadata.locale,
					'@id': `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
					url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
					contentUrl: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
					width: 400,
					height: 400,
					caption: siteMetadata.title,
				},
				image: {
					'@id': `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
				},
				sameAs: [siteMetadata.social.map((url) => url.href)],
			},
			{
				'@type': 'Person',
				'@id': `${siteMetadata.siteUrl}/colphon`,
				name: siteMetadata.author.name,
				image: {
					'@type': 'ImageObject',
					inLanguage: siteMetadata.locale,
					'@id': `${siteMetadata.siteUrl}${siteMetadata.author.avatar}`,
					url: `${siteMetadata.siteUrl}${siteMetadata.author.avatar}`,
					contentUrl: `${siteMetadata.siteUrl}${siteMetadata.author.avatar}`,
					caption: siteMetadata.author.name,
				},
				description: siteMetadata.author.occupation,
				sameAs: [siteMetadata.author.social.map((url) => url.href)],
			},
		],
	}

	return (
		<BlogPost
			source={source}
			title={title}
			publishedAt={published_at}
			updatedAt={updated_at}
			readingTime={readingTime}
			wordsCount={wordsCount}
			cover={cover}
			slug={slug}
			post={post}
			structuredData={structuredData}
		/>
	)
}
