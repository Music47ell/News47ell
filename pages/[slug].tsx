import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { type Page, allPages } from '@/contentlayer/generated'
import PageLayout from '@/layouts/PageLayout'

export async function getStaticPaths() {
	return {
		paths: allPages.map((page) => ({ params: { slug: page.slug } })),
		fallback: false,
	}
}

export const getStaticProps = async ({ params }) => {
	const slug = params.slug as string
	const page = allPages.find((page) => page.slug === slug)

	return { props: { page } }
}

export default function Pages({ page }: { page: Page }) {
	return (
		<PageLayout content={page}>
			<MDXLayoutRenderer content={page} />
		</PageLayout>
	)
}
