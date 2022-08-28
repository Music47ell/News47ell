import { TLanguage } from 'lib/types'

export default function Language(language: TLanguage): JSX.Element {
	return (
		<div className="flex flex-row items-baseline rounded-md bg-nfh-background-secondary p-2">
			<p className="text-sm font-bold">{language.ranking}</p>
			<div className="flex flex-col pl-3">
				<p className="w-60 truncate font-medium sm:w-96 md:w-full">{language.name}</p>
				<p className="w-60 truncate sm:w-96 md:w-full" color="gray.500">
					{language.xps.toLocaleString()}
				</p>
			</div>
		</div>
	)
}
