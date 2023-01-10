'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function LinksHead() {
	return (
		<PageSEO
			title={`Links - ${siteMetadata.author.name}`}
			description="All my links to socials and other networks you can find me on."
		/>
	)
}
