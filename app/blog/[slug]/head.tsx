'use client'

import { BlogSEO } from '@/components/SEO'
import { allBlogs } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

interface PostHeadProps {
	params: {
		slug: string
	}
}

export default function PostHead({ params }: PostHeadProps) {
	const slug = params.slug as string
	const post = allBlogs.find((post) => post.slug === slug)

	return <BlogSEO url={`${siteMetadata.siteUrl}/blog/${slug}`} {...post} />
}
