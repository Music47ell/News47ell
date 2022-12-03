import siteMetadata from '@/data/siteMetadata'

const WEBMENTION_USERNAME = process.env.WEBMENTION_USERNAME
const WEBMENTION_API_KEY = process.env.WEBMENTION_API_KEY

const WEBMENTION_ENDPOINT = `https://webmention.io/api/mentions.json?${WEBMENTION_USERNAME}&token=${WEBMENTION_API_KEY}`

export const getWebmention = async () => {
	if (WEBMENTION_API_KEY === null || WEBMENTION_API_KEY === undefined) {
		throw new Error(`No Webmention API Token found!`)
	}
	const response = await fetch(WEBMENTION_ENDPOINT)

	return response.json()
}

export const getWebmentionBySlug = async (slug: string) => {
	const WEBMENTION_BY_SLUG_ENDPOINT = `https://webmention.io/api/mentions.json?target=${siteMetadata.siteUrl}/${slug}/&per-page=2&page=0`

	if (WEBMENTION_API_KEY === null || WEBMENTION_API_KEY === undefined) {
		throw new Error(`No Webmention API Token found!`)
	}
	const response = await fetch(WEBMENTION_BY_SLUG_ENDPOINT)

	return response.json()
}
