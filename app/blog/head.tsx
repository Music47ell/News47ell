'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function BlogHead() {
	return <PageSEO title={`Blog - ${siteMetadata.title}`} description={siteMetadata.description} />
}
