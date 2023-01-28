'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function NowHead() {
	return (
		<PageSEO title={`/now - ${siteMetadata.author.name}`} description={siteMetadata.description} />
	)
}
