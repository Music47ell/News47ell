import { InferGetStaticPropsType } from 'next'

import { PageSEO } from '@/components/SEO'
import type { Blog } from '@/contentlayer/generated'
import { allBlogs } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortedBlogPost } from '@/lib/contentlayer'

export const getStaticPaths = async () => {
	const totalPosts = allBlogs
	const totalPages = Math.ceil(totalPosts.length / siteMetadata.postsPerPages)
	const paths = Array.from({ length: totalPages }, (_, i) => ({
		params: { page: (i + 1).toString() },
	}))

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps = async (context) => {
	const {
		params: { page },
	} = context
	const posts = sortedBlogPost(allBlogs) as Blog[]
	const pageNumber = parseInt(page as string)
	const initialDisplayPosts = posts.slice(
		siteMetadata.postsPerPages * (pageNumber - 1),
		siteMetadata.postsPerPages * pageNumber
	)
	const pagination = {
		currentPage: pageNumber,
		totalPages: Math.ceil(posts.length / siteMetadata.postsPerPages),
	}

	return {
		props: {
			initialDisplayPosts: allCoreContent(initialDisplayPosts),
			posts: allCoreContent(posts),
			pagination,
		},
	}
}

export default function PostPage({
	posts,
	initialDisplayPosts,
	pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<PageSEO title={siteMetadata.title} description={siteMetadata.description} />
			<ListLayout
				posts={posts}
				initialDisplayPosts={initialDisplayPosts}
				pagination={pagination}
				title={`Page ${pagination.currentPage} of ${pagination.totalPages}`}
			/>
		</>
	)
}
