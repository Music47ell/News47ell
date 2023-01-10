'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

interface PaginationHeadProps {
	params: {
		page: string
	}
}

export default function PaginationHead({ params }: PaginationHeadProps) {
	const page = params.page as string

	const title = `Page ${page} - ${siteMetadata.title}`

	return <PageSEO title={title} description={siteMetadata.description} />
}
