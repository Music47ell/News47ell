'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function FeedsHead() {
	return (
		<PageSEO
			title={`All RSS Feeds - ${siteMetadata.author.name}`}
			description={siteMetadata.description}
		/>
	)
}
