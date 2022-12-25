import { InferGetStaticPropsType } from 'next'

import { MDXLayoutRenderer } from '@/components/MDXComponents'
import type { Blog } from '@/contentlayer/generated'
import { allBlogs } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import PostLayout from '@/layouts/PostLayout'
import { coreContent, sortedBlogPost } from '@/lib/contentlayer'
import { getAuthors } from '@/lib/github'

export async function getStaticPaths() {
	return {
		paths: allBlogs.map((post) => ({ params: { slug: post.slug.split('/') } })),
		fallback: false,
	}
}

export const getStaticProps = async ({ params }) => {
	const slug = (params.slug as string[]).join('/')
	const sortedPosts = sortedBlogPost(allBlogs) as Blog[]
	const postIndex = sortedPosts.findIndex((post) => post.slug === slug)
	const prevContent = sortedPosts[postIndex + 1] || null
	const prev = prevContent ? coreContent(prevContent) : null
	const nextContent = sortedPosts[postIndex - 1] || null
	const next = nextContent ? coreContent(nextContent) : null
	const post = sortedPosts.find((post) => post.slug === slug)
	const authorList = await getAuthors(params)
	const authorDetails = authorList.map(
		(author: { id: number; name: string; avatar: string; url: string }) => {
			return {
				id: author.id,
				name: author.name,
				avatar: author.avatar,
				url: author.url,
			}
		}
	)

	if (!post) {
		return { notFound: true }
	}

	return { props: { post, authorDetails, prev, next } }
}

export default function BlogPostPage({
	post,
	authorDetails,
	prev,
	next,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<PostLayout content={post} authorDetails={authorDetails} prev={prev} next={next}>
			<MDXLayoutRenderer content={post} toc={post?.toc} prev={prev} next={next} />
		</PostLayout>
	)
}
