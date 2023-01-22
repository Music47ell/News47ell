'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function CodesHead() {
	return (
		<PageSEO
			title={`Codes Dashboard - ${siteMetadata.author.name}`}
			description={siteMetadata.description}
		/>
	)
}
