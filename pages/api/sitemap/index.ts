import { NextApiRequest, NextApiResponse } from 'next'

import siteMetadata from '@/data/siteMetadata'
import { getCategories, getSlugsFrom, getTags } from '@/lib/supabase'
import kebabCase from '@/utils/kebab-case'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).send({ error: 'method not allowed' })
	}

	const posts = await getSlugsFrom('posts')
	const pages = await getSlugsFrom('pages')
	const allCategories = (await getCategories()).map((post) => ({
		category: post.category,
	}))
	const categories = allCategories.reduce((acc, post) => {
		if (post.category) {
			const formattedCategory = post.category.toLowerCase()
			if (!acc.includes(formattedCategory)) {
				acc.push(formattedCategory)
			}
		}
		return acc
	}, [] as string[])

	const allTags = (await getTags()).map((post) => ({
		tag: post.tag,
	}))
	const tags = allTags.reduce((acc, post) => {
		if (post.tag) {
			const formattedTag = post.tag.toLowerCase()
			if (!acc.includes(formattedTag)) {
				acc.push(formattedTag)
			}
		}
		return acc
	}, [] as string[])

	const defaultPages = [
		`${siteMetadata.siteUrl}/blog`,
		`${siteMetadata.siteUrl}/categories`,
		`${siteMetadata.siteUrl}/tags`,
		`${siteMetadata.siteUrl}/resume`,
	]

	const siteMap = {
		canonicalPageMap: {
			'/': {
				url: `${siteMetadata.siteUrl}`,
				changeFrequency: 'weekly',
				priority: 1.0,
				lastModified: new Date().toISOString(),
			},
			...defaultPages.reduce((acc, page) => {
				acc[page] = {
					url: page,
					changeFrequency: 'weekly',
					priority: 0.8,
					lastModified: new Date().toISOString(),
				}
				return acc
			}, {} as Record<string, { url: string; changeFrequency: string; priority: number; lastModified: string }>),
			...posts.reduce((acc, post) => {
				acc[`${siteMetadata.siteUrl}/blog/${post}`] = {
					lastModified: new Date().toISOString(),
					changeFrequency: 'daily',
					priority: 0.8,
				}
				return acc
			}, {}),
			...pages.reduce((acc, page) => {
				acc[`${siteMetadata.siteUrl}/${page}`] = {
					lastModified: new Date().toISOString(),
					changeFrequency: 'daily',
					priority: 0.8,
				}
				return acc
			}, {}),
			...categories.reduce((acc, category) => {
				acc[`${siteMetadata.siteUrl}/blog/category/${kebabCase(category)}`] = {
					lastModified: new Date().toISOString(),
					changeFrequency: 'daily',
					priority: 0.8,
				}
				return acc
			}, {}),
			...tags.reduce((acc, tag) => {
				acc[`${siteMetadata.siteUrl}/blog/tag/${kebabCase(tag)}`] = {
					lastModified: new Date().toISOString(),
					changeFrequency: 'daily',
					priority: 0.8,
				}
				return acc
			}, {}),
		},
	}

	res.setHeader('Content-Type', 'application/xml')
	res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${Object.keys(siteMap.canonicalPageMap)
		.map((page) => {
			const { lastModified, changeFrequency, priority } = siteMap.canonicalPageMap[page]
			return `
    <url>
      <loc>${page}</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>${changeFrequency}</changefreq>
      <priority>${priority}</priority>
    </url>
  `
		})
		.join('')}
</urlset>
  `)
}
