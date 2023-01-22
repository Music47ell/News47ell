'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function ShowsHead() {
	return (
		<PageSEO
			title={`Movies and TV Shows Dashboard - ${siteMetadata.author.name}`}
			description={siteMetadata.description}
		/>
	)
}
