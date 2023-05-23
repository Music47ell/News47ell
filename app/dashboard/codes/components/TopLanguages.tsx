import { getTopLanguages } from '@/lib/codestats'

import Language from './Language'

const getCodeStatsTopLanguages = async () => {
	const data = await getTopLanguages()

	const languages = [] as { name: string; xps: number }[]
	Object.keys(data.languages).forEach((language) => {
		const xps = data.languages[language].xps
		languages.push({
			name: language,
			xps: xps,
		})
	})

	const sortedLanguages = languages
		.sort((a, b) => b.xps - a.xps)
		.slice(0, 10)
		.map((language) => {
			return {
				name: language.name,
				xps: language.xps,
			}
		})

	return sortedLanguages
}

function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const TopLanguages = asyncComponent(async () => {
	const sortedLanguages = await getCodeStatsTopLanguages()

	return (
		<div className="grid gap-2 md:grid-cols-2">
			{sortedLanguages.map((language, index) => (
				<Language ranking={index + 1} key={language.name} {...language} />
			))}
		</div>
	)
})

export default TopLanguages
