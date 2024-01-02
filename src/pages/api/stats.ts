import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
export async function GET({ request }: APIContext) {
	const blogs = await getCollection('blog')
	const parser = new MarkdownIt()

	const numberOfPosts = blogs.length
	const numberOfWords = blogs.reduce((acc, post) => {
		const body = sanitizeHtml(parser.render(post.body))
		const words = body.split(' ')
		return acc + words.length
	}, 0)

	const stats = {
		numberOfWords,
		numberOfPosts,
	}

	return new Response(JSON.stringify(stats), {
		headers: {
			'content-type': 'application/json',
		},
	})
}
