'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function ResumeHead() {
	return (
		<PageSEO
			title={`Resume - ${siteMetadata.author.name}`}
			description={siteMetadata.description}
		/>
	)
}
