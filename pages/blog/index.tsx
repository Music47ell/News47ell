import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { PageSEO } from '@/components/SEO'
import type { Blog } from '@/contentlayer/generated'
import { allBlogs } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortedBlogPost } from '@/lib/contentlayer'

export const getStaticProps: GetStaticProps = async () => {
	const posts = sortedBlogPost(allBlogs) as Blog[]

	const initialDisplayPosts = posts.splice(0, siteMetadata.postsPerPages)
	const pagination = {
		currentPage: 1,
		totalPages: Math.ceil(posts.length / siteMetadata.postsPerPages) + 1,
	}

	return {
		props: {
			initialDisplayPosts: allCoreContent(initialDisplayPosts),
			posts: allCoreContent(posts),
			pagination,
		},
	}
}

export default function BlogPage({
	posts,
	pagination,
	initialDisplayPosts,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
	return (
		<>
			<PageSEO title={`Blog - ${siteMetadata.title}`} description={siteMetadata.description} />
			<ListLayout
				posts={posts}
				pagination={pagination}
				initialDisplayPosts={initialDisplayPosts}
				title="Blog"
			/>
		</>
	)
}
