'use client'

import { TaxonomySEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

interface TagHeadProps {
	params: {
		tag: string
	}
}

export default function TagHead({ params }: TagHeadProps) {
	const tag = params.tag as string

	const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

	return (
		<TaxonomySEO
			title={`${title} - ${siteMetadata.title}`}
			description={`Posts tagged with ${title} - ${siteMetadata.title}`}
		/>
	)
}
