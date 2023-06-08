import siteMetadata from '@/data/siteMetadata'

export default function robots() {
	return {
		rules: [
			{
				userAgent: '*',
			},
		],
		sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
	}
}
