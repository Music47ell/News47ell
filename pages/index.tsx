import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import HomeLayout from '@/layouts/HomeLayout'

export default function Home() {
	return (
		<>
			<PageSEO title={siteMetadata.title} description={siteMetadata.description} />
			<HomeLayout />
		</>
	)
}
