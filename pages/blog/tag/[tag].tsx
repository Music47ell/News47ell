import { InferGetStaticPropsType } from 'next'

import { TaxonomySEO } from '@/components/SEO'
import { allBlogs } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, allTags } from '@/lib/contentlayer'
import kebabCase from '@/utils/kebab-case'

export async function getStaticPaths() {
	const tags = await allTags(allBlogs)

	return {
		paths: Object.keys(tags).map((tag) => ({
			params: {
				tag,
			},
		})),
		fallback: false,
	}
}

export const getStaticProps = async (context: { params: { tag: string } }) => {
	const tag = context.params.tag as string
	const filteredPosts = allCoreContent(
		allBlogs.filter(
			(post) => post.draft !== true && post.tags.map((t: string) => kebabCase(t)).includes(tag)
		)
	)

	return { props: { posts: filteredPosts, tag } }
}

export default function Tag({ posts, tag }: InferGetStaticPropsType<typeof getStaticProps>) {
	// Capitalize first letter and convert space to dash
	const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
	return (
		<>
			<TaxonomySEO
				title={`${tag} - ${siteMetadata.title}`}
				description={`Posts tagged with ${tag} - ${siteMetadata.title}`}
			/>
			<ListLayout posts={posts} title={`Posts tagged with ${title}`} />
		</>
	)
}
