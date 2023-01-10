'use client'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function HomepageHead() {
	return <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
}
