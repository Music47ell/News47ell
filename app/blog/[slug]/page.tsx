import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { PageTitle } from '@/components/UI'
import { SectionContainer } from '@/components/UI'
import ViewsCounter from '@/components/ViewsCounter'
import type { Blog } from '@/contentlayer/generated'
import { allBlogs } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { getContent } from '@/lib/contentlayer'
import { displayDate, hEntryDate } from '@/utils/format-time-date'

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

	const { source, title, published_at, updated_at, readingTime, wordsCount } = post

	return (
		<SectionContainer>
			<main className="col-span-10 flex flex-col lg:col-span-7">
				<article className="h-entry">
					<div className="relative flex w-full flex-col items-center justify-center pb-6">
						<div className="flex items-center justify-center gap-4">
							<time
								dateTime={hEntryDate(updated_at)}
								className="dt-published"
								aria-label={`Published at: ${displayDate(published_at)}`}
							>
								{displayDate(updated_at)}
							</time>
							<Link
								href={slug as Route}
								className="u-url flex text-nfh-accent-primary hover:text-nfh-text-secondary"
							>
								⌘ Permalink
							</Link>
						</div>
						<div className="text-center">
							{source ? (
								<Link href={source as Route}>
									<PageTitle>{title} &#8599;</PageTitle>
								</Link>
							) : (
								<PageTitle>{title}</PageTitle>
							)}
						</div>
						<div className="grid grid-cols-3 items-center justify-items-center gap-4 text-sm tabular-nums">
							<div className="flex items-center">
								<span className="sr-only">Reading time</span>
								<span>{readingTime} minutes</span>
							</div>
							<div className="flex items-center">
								<span className="sr-only">Words Count</span>
								<span>{wordsCount} words</span>
							</div>
							<div className="flex items-center">
								<span className="sr-only">Views</span>
								<ViewsCounter slug={slug} trackView={true} />
							</div>
						</div>
					</div>
					<div className="relative bg-nfh-background-primary">
						<div className="relative max-w-3xl divide-y divide-nfh-accent-secondary sm:mx-auto">
							<div className="e-content entry-content prose prose-theme max-w-none text-base">
								<MDXLayoutRenderer content={post} toc={post?.toc} />
							</div>
						</div>
					</div>
				</article>
			</main>
		</SectionContainer>
	)
}
