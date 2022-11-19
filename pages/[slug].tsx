/* eslint-disable @typescript-eslint/no-explicit-any */
import PageLayout from '@/layouts/PageLayout'
import { getAuthorByUserId, getContentBySlugFrom, getSlugsFrom } from '@/lib/supabase'

export async function getStaticPaths() {
	const slugs = await getSlugsFrom('pages')
	const paths = slugs.map((slug) => ({ params: { slug: slug } }))
	return {
		paths,
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params }) {
	const { slug } = params
	const data = await getContentBySlugFrom('pages', slug)

	if (!data) {
		return { notFound: true }
	}

	const author = await getAuthorByUserId(data.user_id)

	const content = data.content

	const frontMatter = {
		title: data.title,
		created_at: data.created_at,
		updated_at: data.updated_at,
		slug: data.slug,
		author,
	}

	return {
		props: {
			frontMatter,
			content,
		},
		revalidate: 10,
	}
}

export default function Page({ frontMatter, content }) {
	if (!frontMatter || !content) return <div></div>

	return <PageLayout frontMatter={frontMatter} content={content} />
}
