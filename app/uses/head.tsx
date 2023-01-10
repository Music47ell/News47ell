'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function UsesHead() {
	return (
		<PageSEO title={`Uses - ${siteMetadata.author.name}`} description={siteMetadata.description} />
	)
}
