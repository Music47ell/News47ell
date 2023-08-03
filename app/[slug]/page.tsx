import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { PageTitle } from '@/components/UI'
import { SectionContainer } from '@/components/UI'
import type { Page } from '@/contentlayer/generated'
import { allPages } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { getContent } from '@/lib/contentlayer'
import { displayDate } from '@/utils/formatters'

// https://beta.nextjs.org/docs/api-reference/segment-config
export const dynamicParams = false

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export async function generateStaticParams() {
	return allPages.map((page) => ({
		slug: page.slug,
	}))
}

export async function generateMetadata({ params }): Promise<Metadata | undefined> {
	const post = allPages.find((post) => post.slug === params.slug)
	if (!post) {
		return
	}

	const { title, published_at: publishedTime, slug } = post
	const ogImage = `${siteMetadata.siteUrl}/api/og/image?title=${encodeURIComponent(title)}`

	return {
		title,
		description: siteMetadata.description,
		openGraph: {
			title,
			description: siteMetadata.description,
			publishedTime,
			url: `${siteMetadata.siteUrl}/blog/${slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description: siteMetadata.description,
			images: [ogImage],
		},
	}
}

export default function Page({ params }: { params: { slug: string } }) {
	const slug = params.slug as string
	const pages = getContent(allPages) as Page[]
	const page = pages.find((page) => page.slug === slug)

	if (!page) {
		notFound()
	}

	const { title, updated_at } = page

	return (
		<SectionContainer>
			<main className="col-span-10 flex flex-col lg:col-span-7">
				<article className="h-entry">
					<time
						dateTime={`Updated at: ${displayDate(updated_at)}`}
						className="dt-published"
						aria-label={`Updated at: ${displayDate(updated_at)}`}
					>
						{displayDate(updated_at)}
					</time>
					<PageTitle>{title}</PageTitle>
					<div className="relative bg-nfh-background-primary py-6">
						<div className="relative max-w-3xl divide-y divide-nfh-accent-secondary sm:mx-auto">
							<div className="e-content entry-content prose prose-theme max-w-none text-base">
								<MDXLayoutRenderer content={page} />
							</div>
						</div>
					</div>
				</article>
			</main>
		</SectionContainer>
	)
}
