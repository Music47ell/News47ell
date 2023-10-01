import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { escape, siteMetadata } from './index.mjs'

export default async function generateFeeds() {
	const parser = new MarkdownIt();
	const generateRssItem = (siteMetadata, post) => `
	<item>
		<guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
		<title>${escape(post.title)}</title>
		<link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
		${post.description && `<description>${escape(post.description)}</description>`}
		<pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
		<author>${siteMetadata.email} (${siteMetadata.author})</author>
		<wordsCount>${post.wordsCount}</wordsCount>
		<content:encoded><![CDATA[${sanitizeHtml(parser.render(post.body.raw))}]]></content:encoded>
	</item>
`

	const generateRss = (siteMetadata, posts, page = 'feed.xml') => `<?xml version="1.0" encoding="utf-8"?>
  <?xml-stylesheet href="/blog/feed.xsl" type="text/xsl"?>
	<rss version="2.0"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:wfw="http://wellformedweb.org/CommentAPI/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
    xmlns:slash="http://purl.org/rss/1.0/modules/slash/"

	xmlns:georss="http://www.georss.org/georss"
	xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#">
		<channel>
			<title>${siteMetadata.title}</title>
			<link>${siteMetadata.siteUrl}/blog</link>
			<description>${escape(siteMetadata.description)}</description>
			<language>${siteMetadata.language}</language>
			<managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
			<webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
			<lastBuildDate>${new Date(posts[0].published_at).toUTCString()}</lastBuildDate>
			<atom:link href="${siteMetadata.siteUrl}/blog/${page}" rel="self" type="application/rss+xml"/>
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
		"words_count": "${post.wordsCount}",
		"content_html": "${sanitizeHtml(parser.render(post.body.raw)).replace(/"/g, "'").replace(/\n/g, '').replace(/[\x00-\x1F\x7F-\x9F]/g, '')}"
	}
`

	const generateJson = (siteMetadata, posts, page = 'feed.xml') => `{
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
