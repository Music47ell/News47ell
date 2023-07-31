import type { Metadata } from 'next'
import { Suspense } from 'react'

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
			<main className="h-feed flex flex-col py-8">
				<Suspense fallback={<Loader />}>
					{posts.map((post, index: number) => (
						<BlogPostList key={index} post={post} />
					))}
				</Suspense>
			</main>
		</SectionContainer>
	)
}
