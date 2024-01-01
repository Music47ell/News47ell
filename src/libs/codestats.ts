import siteMetadata from '@/data/siteMetadata'
import { get_level, get_level_progress } from '@/utils/level-calc'
const API_ENDPOINT = 'https://codestats.net/api/users/'
import { CodeStats, Languages } from '@/libs/types'

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

	const data = (await response.json()) as Languages

	const languages = [] as { name: string; xps: number; level: number; percent: number }[]
	// combine JavaScript (JSX) and TypeScript (JSX) into one and combine their xps
	const jsXps = data.languages['JavaScript (JSX)'].xps
	const tsXps = data.languages['TypeScript (JSX)'].xps
	languages.push({
		name: 'React',
		xps: jsXps + tsXps,
		level: get_level(jsXps + tsXps),
		percent: get_level_progress(jsXps + tsXps),
	})
	data.languages['JavaScript·(JSX)'] = undefined
	data.languages['TypeScript (JSX)'] = undefined
	for (const language in data.languages) {
		if (data.languages[language] !== undefined) {
			languages.push({
				name: language,
				xps: data.languages[language].xps,
				level: get_level(data.languages[language].xps),
				percent: get_level_progress(data.languages[language].xps),
			})
		}
	}

	const sortedLanguages = languages
		.sort((a, b) => b.xps - a.xps)
		.slice(0, 10)
		.map((language) => {
			return {
				name: language.name,
				xps: language.xps,
				level: language.level,
				percent: language.percent,
			}
		})

	return sortedLanguages
}
