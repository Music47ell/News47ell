import generateFeeds from './generate-feeds.mjs'
import generateSitemap from './generate-sitemap.mjs'

async function postBuild() {
	await Promise.all([generateFeeds(), generateSitemap()])
}

postBuild()
