import { allBlogs, allPages } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export default async function sitemap() {
	const blogs = allBlogs
		.filter((post) => !(post.draft === true))
		.map((post) => ({
			url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
			lastModified: post.updated_at.split('T')[0],
		}))
	const pages = allPages
		.filter((post) => !(post.draft === true))
		.map((post) => ({
			url: `${siteMetadata.siteUrl}/${post.slug}`,
			lastModified: post.updated_at.split('T')[0],
		}))

	const routes = ['', '/blog', '/dashboard'].map((route) => ({
		url: `${siteMetadata.siteUrl}${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}))

	return [...routes, ...blogs, ...pages]
}
