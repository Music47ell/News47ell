import 'server-only'

import siteMetadata from '@/data/siteMetadata'
const API_ENDPOINT = `https://codestats.net/api/users/`
import { CodeStats, Languages } from '@/lib/types'

export const getCodeStats = async () => {
	const response = await fetch(`${API_ENDPOINT}${siteMetadata.author.username}`)

	const stats = (await response.json()) as CodeStats

	stats.user = siteMetadata.author.username
	stats.previous_xp = stats?.total_xp - stats?.new_xp
	stats.level = Math.floor(0.025 * Math.sqrt(stats?.total_xp - stats?.new_xp))

	return stats
}

export const getTopLanguages = async () => {
	const response = await fetch(`${API_ENDPOINT}${siteMetadata.author.username}`)

	const languages = (await response.json()) as Languages

	return languages
}
