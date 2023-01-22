'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function SponsorHead() {
	return (
		<PageSEO
			title={`Sponsor - ${siteMetadata.author.name}`}
			description={siteMetadata.description}
		/>
	)
}
