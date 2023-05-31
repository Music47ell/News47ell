import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'

import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { escape, siteMetadata } from './index.mjs'

export default async function generateFeeds() {
	const generateRssItem = (siteMetadata, post) => `
	<item>
		<guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
		<title>${escape(post.title)}</title>
		<link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
		${post.description && `<description>${escape(post.description)}</description>`}
		<pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
		<author>${siteMetadata.email} (${siteMetadata.author})</author>
	</item>
`

	const generateRss = (siteMetadata, posts, page = 'feed.xml') => `
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
		<channel>
			<title>${siteMetadata.title}</title>
			<link>${siteMetadata.siteUrl}/blog</link>
			<description>${escape(siteMetadata.description)}</description>
			<language>${siteMetadata.locale}</language>
			<managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
			<webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
			<lastBuildDate>${new Date(posts[0].published_at).toUTCString()}</lastBuildDate>
			<atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
			${posts.map((post) => generateRssItem(siteMetadata, post)).join('')}
		</channel>
	</rss>
`

	const generateJsonItem = (siteMetadata, post) => `
	{
		"id": "${siteMetadata.siteUrl}/blog/${post.slug}",
		"url": "${siteMetadata.siteUrl}/blog/${post.slug}",
		"title": "${escape(post.title)}",
		${post.description && `"description": "${escape(post.description)}",`}
		"date_published": "${new Date(post.published_at).toUTCString()}",
		"author": {
			"name": "${siteMetadata.author}",
			"url": "${siteMetadata.siteUrl}",
			"avatar": "${siteMetadata.siteUrl}/${siteMetadata.avatar}"
		},
	}
`

	const generateJson = (siteMetadata, posts, page = 'feed.xml') => `
	{
		"version": "https://jsonfeed.org/version/1.1",
		"title": "${siteMetadata.title}",
		"home_page_url": "${siteMetadata.siteUrl}/blog",
		"feed_url": "${siteMetadata.siteUrl}/${page}",
		"icon": "${siteMetadata.siteUrl}/android-chrome-512x512.png",
		"favicon": "${siteMetadata.siteUrl}/favicon-32x32.png",
		"description": "${escape(siteMetadata.description)}",
		"author": {
			"name": "${siteMetadata.author}",
			"url": "${siteMetadata.siteUrl}",
			"avatar": "${siteMetadata.siteUrl}/${siteMetadata.avatar}"
		},
		"items": [
			${posts.map((post) => generateJsonItem(siteMetadata, post)).join(',')}
		]
	}
`

	const publishPosts = allBlogs
		.filter((post) => post.draft !== true)
		.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
	// RSS for blog post
	if (publishPosts.length > 0) {
		const rssPath = path.join('public', 'blog')
		mkdirSync(rssPath, { recursive: true })
		const rss = generateRss(siteMetadata, publishPosts)
		writeFileSync(path.join(rssPath, 'feed.xml'), rss)
		console.log('RSS feed for posts generated...')
		const json = generateJson(siteMetadata, publishPosts)
		writeFileSync(path.join(rssPath, 'feed.json'), json)
		console.log('JSON feed for posts generated...')
	}
}
