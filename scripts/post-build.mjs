import generateFeeds from './generate-feeds.mjs'

async function postBuild() {
	await Promise.all([generateFeeds()])
}

postBuild()
