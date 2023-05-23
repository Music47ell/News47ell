import { allBlogs } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export default async function sitemap() {
	const blogs = allBlogs.map((post) => ({
		url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
		lastModified: post.published_at.split('T')[0],
	}))

	const routes = [
		'',
		'/blog',
		'/certificates',
		'/dashboard',
		'/feeds',
		'/links',
		'/now',
		'/resume',
		'/sponsor',
		'/uses',
	].map((route) => ({
		url: `${siteMetadata.siteUrl}${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}))

	return [...routes, ...blogs]
}
