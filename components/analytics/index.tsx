import Umami from './Umami'
import siteMetadata from '@/data/siteMetadata'

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = (): JSX.Element => {
	return (
		isProduction &&
		siteMetadata.analytics.umamiWebsiteId &&
		siteMetadata.analytics.umamiScriptUrl && <Umami />
	)
}

export default Analytics
