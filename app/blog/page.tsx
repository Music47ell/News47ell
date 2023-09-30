import type { Metadata } from 'next'
import { Suspense } from 'react'

import { default as Link } from '@/components/Link'
import NewsletterForm from '@/components/NewsletterForm'
import { SectionContainer } from '@/components/UI'
import { Loader } from '@/components/UI'
import type { Blog } from '@/contentlayer/generated'
import { getBlogHomepage } from '@/lib/contentlayer'

import BlogPostList from './BlogPostList'

export const metadata: Metadata = {
	title: 'Blog',
	description: 'News, reviews, how-tos and everything else related to the world of technology.',
}

export default function Blog() {
	const posts = getBlogHomepage() as Blog[]

	return (
		<SectionContainer>
			<NewsletterForm />
			<div className="mb-2 mt-6 flex justify-end">
				<Link
					href="/blog/feed.xml"
					target="_blank"
					className="flex items-center gap-x-1 text-sm font-semibold transition-colors"
				>
					<span>RSS</span>
				</Link>
			</div>
			<main className="divide-y divide-nfh-accent-secondary overflow-hidden rounded-xl border border-nfh-accent-primary bg-nfh-background-secondary">
				<Suspense fallback={<Loader />}>
					{posts.map((post, index: number) => (
						<BlogPostList key={index} post={post} />
					))}
				</Suspense>
			</main>
		</SectionContainer>
	)
}
