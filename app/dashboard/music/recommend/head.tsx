'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function MusicRecommendHead() {
	return (
		<PageSEO
			title={`Recommend a song - ${siteMetadata.author.name}`}
			description={siteMetadata.description}
		/>
	)
}
