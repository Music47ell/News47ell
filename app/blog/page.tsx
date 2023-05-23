import { SectionContainer } from '@/components/UI'
import { PageTitle } from '@/components/UI'
import type { Blog } from '@/contentlayer/generated'
import { getBlogHomepage } from '@/lib/contentlayer'

import BlogPostCard from './components/BlogPostCard'

export default function Blog() {
	const posts = getBlogHomepage() as Blog[]

	return (
		<SectionContainer>
			<PageTitle>Blog</PageTitle>
			<main className="h-feed flex flex-col py-8">
				{posts.map((post, index: number) => (
					<BlogPostCard key={index} title={post.title} slug={post.slug} />
				))}
			</main>
		</SectionContainer>
	)
}
