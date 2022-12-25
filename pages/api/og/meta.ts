import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const targetURL = req.query.url as string

	try {
		const target = await fetch(targetURL)

		const html = await target.text()

		const meta: {
			site?: {
				name: string
				favicon: string
			}
			title?: string
			description?: string
			image?: {
				url: string
			}
			url?: string
		} = {}

		// Get content of og:site_name
		const site_name = html.match(/<meta property="og:site_name" content="(.+?)"/)

		// Get content of favicon from all supported browsers
		const faviconRegex = /<link[^>]+rel=.(icon|shortcut icon|alternate icon)[^>]+>/gi
		const hrefMatch = /href=['"]([^"|^>]+)['"]/

		const favicon = html.match(faviconRegex)

		if (site_name) {
			const href = favicon[0].match(hrefMatch)
			meta.site = {
				name: site_name[1],
				favicon: href[1],
			}
		}

		// Get content of og:title
		const title = html.match(/<meta property="og:title" content="(.*?)"/)

		if (title) {
			meta.title = title[1]
		}

		// Get content of og:description
		const description = html.match(/<meta property="og:description" content="(.*?)"/)

		if (description) {
			meta.description = description[1]
		}

		// Get content of og:image
		const image = html.match(/<meta property="og:image" content="(.*?)"/)

		if (image) {
			meta.image = {
				url: image[1],
			}
		}

		// Get content of og:url
		const url = html.match(/<meta property="og:url" content="(.*?)"/)

		if (url) {
			meta.url = url[1]
		}

		res.json({
			success: 1,
			meta,
		})
	} catch {
		res.json({})
	}
}
