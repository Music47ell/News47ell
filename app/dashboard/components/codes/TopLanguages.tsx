import { getTopLanguages } from '@/lib/codestats'

import Progress from './Progress'

const LEVEL_FACTOR = 0.025

function get_level(xp) {
	return Math.floor(Math.sqrt(xp) * LEVEL_FACTOR)
}

function get_next_level_xp(level) {
	return Math.ceil((level + 1) / LEVEL_FACTOR) ** 2
}

function get_level_progress(xp) {
	const level = get_level(xp)
	const current_level_xp = get_next_level_xp(level - 1)
	const next_level_xp = get_next_level_xp(level)
	const have_xp = xp - current_level_xp
	const needed_xp = next_level_xp - current_level_xp

	return Math.round((have_xp / needed_xp) * 100)
}

const XP_FORMATTER = new Intl.NumberFormat('en-US', {
	maximumFractionDigits: 0,
})

const getCodeStatsTopLanguages = async () => {
	const data = await getTopLanguages()

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
	delete data.languages['JavaScript (JSX)']
	delete data.languages['TypeScript (JSX)']
	Object.keys(data.languages).forEach((language) => {
		const xps = data.languages[language].xps
		languages.push({
			name: language,
			xps: xps,
			level: get_level(xps),
			percent: get_level_progress(xps),
		})
	})

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

function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const TopLanguages = asyncComponent(async () => {
	const sortedLanguages = await getCodeStatsTopLanguages()

	return (
		<div className="relative flex flex-1 flex-col gap-2 rounded-lg bg-gradient-to-r from-nfh-accent-secondary to-nfh-accent-primary p-[2px]">
			<div className="h-full w-full rounded-lg bg-nfh-background-primary p-2">
				<p className="absolute -top-3 left-3 bg-nfh-background-primary px-2">
					Top Programming Languages I use
				</p>
				<div className="grid gap-2 px-4 py-3">
					{sortedLanguages.map((language, index) => (
						// <Language ranking={index + 1} key={language.name} {...language} />
						<Progress
							key={index}
							data={language}
							className="bg-gradient-to-r from-nfh-accent-secondary to-nfh-accent-primary"
						/>
					))}
				</div>
			</div>
		</div>
	)
})

export default TopLanguages
