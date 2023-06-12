import type { Metadata } from 'next'
import { Suspense } from 'react'

import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'
import { Loader } from '@/components/UI'
import ViewsCounter from '@/components/ViewsCounter'
import type { Blog } from '@/contentlayer/generated'
import { getBlogHomepage } from '@/lib/contentlayer'

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
						<Link key={index} className="mb-4 flex flex-col space-y-1" href={`/blog/${post.slug}`}>
							<div className="flex w-full flex-col">
								<h2 className="text-2xl font-bold">{post.title}</h2>
								<span className="flex flex-row"></span>
								<ViewsCounter slug={post.slug} trackView={false} />
							</div>
						</Link>
					))}
				</Suspense>
			</main>
		</SectionContainer>
	)
}
