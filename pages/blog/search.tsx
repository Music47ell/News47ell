import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import SearchLayout from '@/layouts/SearchLayout'

export default function Blog(): JSX.Element {
	return (
		<>
			<PageSEO title={`Search - ${siteMetadata.author}`} description={siteMetadata.description} />
			<SearchLayout />
		</>
	)
}
