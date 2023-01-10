'use client'

import type { Blog } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { getBlogHomepage } from '@/lib/contentlayer'

export default function Blog() {
	const sortedPosts = getBlogHomepage() as Blog[]

	const initialDisplayPosts = sortedPosts.splice(0, siteMetadata.postsPerPages)
	const pagination = {
		currentPage: 1,
		totalPages: Math.ceil(sortedPosts.length / siteMetadata.postsPerPages) + 1,
	}

	return (
		<ListLayout
			posts={sortedPosts}
			pagination={pagination}
			initialDisplayPosts={initialDisplayPosts}
			title="Blog"
		/>
	)
}
