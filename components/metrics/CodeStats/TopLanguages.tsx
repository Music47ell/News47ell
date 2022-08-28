import { Language } from '@/components/metrics/CodeStats'
import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/lib/fetcher'
import { Languages } from 'lib/types'
import useSWR from 'swr'

const API_ENDPOINT = `https://codestats.net/api/users/`

export default function TopLanguages(): JSX.Element {
	const { data } = useSWR<Languages>(`${API_ENDPOINT}${siteMetadata.codestats}`, fetcher)

	if (!data) {
		return null
	}

	const languages = []
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

	return (
		<div className="grid gap-2 md:grid-cols-2">
			{sortedLanguages.map((language, index) => (
				<Language ranking={index + 1} key={language.name} {...language} />
			))}
		</div>
	)
}
