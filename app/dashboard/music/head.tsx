'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function MusicHead() {
	return (
		<PageSEO
			title={`Music Dashboard - ${siteMetadata.author.name}`}
			description={siteMetadata.description}
		/>
	)
}
