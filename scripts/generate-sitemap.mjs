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
		.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
		.map((x) => `/${x._raw.flattenedPath}`)
	const contentTags = await allTags(allBlogs).then((tags) =>
		Object.keys(tags)
			.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
			.map((tag) => `/blog/tag/${tag}`)
	)
	const pages = await globby(
		['pages/*.(js|tsx)', '!pages/_*.(js|tsx)', '!pages/api', '!pages/404.(js|tsx)'],
		{
			ignore: ['pages/[slug].(js|tsx)'],
		}
	)
	const sitemap = `
				<?xml version="1.0" encoding="UTF-8"?>
				<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
				<url>
						<loc>${siteUrl}</loc>
						<lastmod>${new Date().toISOString()}</lastmod>
				</url>
${pages
	.concat([
		'/blog',
		'/certificates',
		'/colophon',
		'/dashboard',
		'/feeds',
		'/links',
		'/now',
		'/resume',
		'/sponsor',
		'/uses',
	])
	.concat(contentPosts)
	.concat(contentTags)
	.map((page) => {
		const path = page
			.replace('pages/', '/')
			.replace('public/', '/')
			.replace(/\.[^/.]+$/, '')
		const route = path === '/index' ? '' : path
		return `
												<url>
														<loc>${siteUrl}${route}</loc>
														<lastmod>${new Date().toISOString()}</lastmod>
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
