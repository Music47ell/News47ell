import { mkdirSync, writeFileSync } from 'fs'
import { slug } from 'github-slugger'
import path from 'path'

import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { allTags, escape, siteMetadata } from './index.mjs'

export default async function generateFeeds() {
	const generateRssItem = (siteMetadata, post) => `
	<item>
		<guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
		<title>${escape(post.title)}</title>
		<link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
		${post.description && `<description>${escape(post.description)}</description>`}
		<pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
		<author>${siteMetadata.email} (${siteMetadata.author})</author>
		${post.tags && post.tags.map((t) => `<category>${t}</category>`).join('')}
	</item>
`

	const generateRss = (siteMetadata, posts, page = 'feed.xml') => `
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
		<channel>
			<title>${escape(siteMetadata.title)}</title>
			<link>${siteMetadata.siteUrl}/blog</link>
			<description>${escape(siteMetadata.description)}</description>
			<language>${siteMetadata.language}</language>
			<managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
			<webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
			<lastBuildDate>${new Date(posts[0].published_at).toUTCString()}</lastBuildDate>
			<atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
			${posts.map((post) => generateRssItem(siteMetadata, post)).join('')}
		</channel>
	</rss>
`

	const publishPosts = allBlogs.filter((post) => post.draft !== true)
	// RSS for blog post
	if (publishPosts.length > 0) {
		const rss = generateRss(siteMetadata, publishPosts)
		writeFileSync('./public/feed.xml', rss)
		console.log('RSS feed for posts generated...')
	}

	// RSS for tags
	if (publishPosts.length > 0) {
		const tags = await allTags(publishPosts)
		for (const tag of Object.keys(tags)) {
			const filteredPosts = allBlogs.filter((post) => post.tags.map((t) => slug(t)).includes(tag))
			const rss = generateRss(siteMetadata, filteredPosts, `tag/${tag}/feed.xml`)
			const rssPath = path.join('public', 'tags', tag)
			mkdirSync(rssPath, { recursive: true })
			writeFileSync(path.join(rssPath, 'feed.xml'), rss)
		}
		console.log('RSS feed for tags generated...')
	}
}
