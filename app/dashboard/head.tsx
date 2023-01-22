'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function DashboardHead() {
	return (
		<PageSEO
			title={`Dashboard - ${siteMetadata.title}`}
			description={siteMetadata.description}
			url={siteMetadata.siteUrl}
		/>
	)
}
