import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ArchiveLayout from '@/layouts/ArchiveLayout'
import { getContentFrontMatter } from '@/lib/supabase'

export const getStaticProps: GetStaticProps = async () => {
	const db = await getContentFrontMatter('posts')

	return {
		props: {
			posts: db,
		},
		revalidate: 10,
	}
}

export default function Archive({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<PageSEO
				title={siteMetadata.title}
				description={siteMetadata.description}
				url={siteMetadata.siteUrl}
			/>
			<ArchiveLayout posts={posts} title="All Posts" />
		</>
	)
}
