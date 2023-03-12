'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function CertificatesHead() {
	return (
		<PageSEO
			title={`Certificates - ${siteMetadata.author.name}`}
			description={siteMetadata.description}
		/>
	)
}
