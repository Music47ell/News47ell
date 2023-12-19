import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import siteMetadata from '@/data/siteMetadata'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt()

export async function GET(context: any) {
	const blog: CollectionEntry<'blog'>[] = await getCollection('blog')

	const tag = context.params.tag
	const filteredBlog = blog
		.sort((a, b) => b.data.published_at.getTime() - a.data.published_at.getTime())
		.filter((blog) =>
			blog.data.tags.map((tag) => tag.replace(/\s+/g, '-').toLowerCase()).includes(tag)
		)

	return rss({
		title: siteMetadata.title,
		description: siteMetadata.description,
		site: context.site,
		xmlns: {
			atom: 'http://www.w3.org/2005/Atom',
		},
		customData: `
    <language>${siteMetadata.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <webMaster>${siteMetadata.email} (${siteMetadata.author.name})</webMaster>
    <managingEditor>${siteMetadata.email} (${siteMetadata.author.name})</managingEditor>
    <atom:link href="${context.site}/feed.xml" rel="self" type="application/rss+xml" />
    `,
		items: filteredBlog
			.sort((a, b) => b.data.published_at - a.data.published_at)
			.map((post) => ({
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.published_at,
				link: `/blog/${post.slug}/`,
				categories: post.data.tags,
				author: `${siteMetadata.email} (${siteMetadata.author.name})`,
				content: sanitizeHtml(parser.render(post.body)),
			})),
		stylesheet: '/feed.xsl',
	})
}