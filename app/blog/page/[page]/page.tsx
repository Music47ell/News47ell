'use client'

import type { Blog } from '@/contentlayer/generated'
import { allBlogs } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { getBlogHomepage } from '@/lib/contentlayer'

// https://beta.nextjs.org/docs/api-reference/segment-config
export const dynamicParams = false

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export async function generateStaticParams() {
	const totalPages = Math.ceil(allBlogs.length / siteMetadata.postsPerPages)
	const paths = Array.from({ length: totalPages }, (_, i) => ({
		page: (i + 1).toString(),
	}))

	return paths
}

export default function Pagination({ params }) {
	const page = params.page as string
	const sortedPosts = getBlogHomepage() as Blog[]
	const pageNumber = parseInt(page as string)
	const initialDisplayPosts = sortedPosts.slice(
		siteMetadata.postsPerPages * (pageNumber - 1),
		siteMetadata.postsPerPages * pageNumber
	)
	const pagination = {
		currentPage: pageNumber,
		totalPages: Math.ceil(sortedPosts.length / siteMetadata.postsPerPages),
	}

	return (
		<ListLayout
			posts={sortedPosts}
			initialDisplayPosts={initialDisplayPosts}
			pagination={pagination}
			title={`Page ${pagination.currentPage} of ${pagination.totalPages}`}
		/>
	)
}
