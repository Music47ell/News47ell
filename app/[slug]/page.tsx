'use client'

import { notFound } from 'next/navigation'

import { MDXLayoutRenderer } from '@/components/MDXComponents'
import type { Page } from '@/contentlayer/generated'
import { allPages } from '@/contentlayer/generated'
import PageLayout from '@/layouts/PageLayout'
import { getContent } from '@/lib/contentlayer'

// https://beta.nextjs.org/docs/api-reference/segment-config
export const dynamicParams = false

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export async function generateStaticParams() {
	return allPages.map((page) => ({
		slug: page.slug,
	}))
}

export default function Page({ params }) {
	const slug = params.slug as string
	const pages = getContent(allPages) as Page[]
	const page = pages.find((page) => page.slug === slug)

	if (!page) {
		notFound()
	}

	return (
		<PageLayout content={page}>
			<MDXLayoutRenderer content={page} />
		</PageLayout>
	)
}
