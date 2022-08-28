import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getContentFrontMatter } from '@/lib/supabase'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'

export const getStaticProps: GetStaticProps = async () => {
	const db = await getContentFrontMatter('posts')

	const initialDisplayPosts = db.splice(0, siteMetadata.postsPerPages)
	const pagination = {
		currentPage: 1,
		totalPages: Math.ceil(db.length / siteMetadata.postsPerPages) + 1,
	}

	return {
		props: {
			posts: db,
			pagination,
			initialDisplayPosts,
		},
		revalidate: 10,
	}
}

export default function Blog({
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
