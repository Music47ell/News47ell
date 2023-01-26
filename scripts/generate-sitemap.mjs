/* eslint-disable @typescript-eslint/indent */
import { writeFileSync } from 'fs'
import { globby } from 'globby'
import prettier from 'prettier'

import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { allTags } from './index.mjs'

export default async function generateSitemap() {
	const siteUrl = 'https://www.news47ell.com'
	const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
	const contentPosts = allBlogs
		.filter((x) => !x.draft && !x.canonicalUrl)
		.map((x) => `/${x._raw.flattenedPath}`)
	const contentTags = await allTags(allBlogs).then((tags) =>
		Object.keys(tags).map((tag) => `/tag/${tag}`)
	)
	const pages = await globby(
		[
			'pages/*.(js|tsx)',
			'public/blog/tag/**/*.xml',
			'!pages/_*.(js|tsx)',
			'!pages/api',
			'!pages/404.(js|tsx)',
		],
		{
			ignore: ['pages/[slug].(js|tsx)'],
		}
	)
	const sitemap = `
				<?xml version="1.0" encoding="UTF-8"?>
				<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.concat(contentPosts)
	.concat(contentTags)
	.map((page) => {
		const path = page
			.replace('pages/', '/')
			.replace('public/', '/')
			.replace(/\.[^/.]+$/, '')
			.replace('posts', 'blog')
		const route = path === '/index' ? '' : path
		const slashesCount = (route.match(/\//g) || []).length
		let priority = 1 - 0.2 * slashesCount
		if (route.length <= 1 || priority > 1.0) priority = 1.0
		if (priority < 0.2) priority = 0.2
		return `
												<url>
														<loc>${siteUrl}${route}</loc>
														<lastmod>${new Date().toISOString()}</lastmod>
														<priority>${priority}</priority>
												</url>
										`
	})
	.join('')}
				</urlset>
		`

	const formatted = prettier.format(sitemap, {
		...prettierConfig,
		parser: 'html',
	})

	writeFileSync('public/sitemap.xml', formatted)
	console.log('Sitemap generated...')
}
