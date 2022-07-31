import { TLanguage } from 'lib/types'

export default function Language(language: TLanguage): JSX.Element {
  return (
    <div className="mt-8 flex w-full flex-row items-baseline border-b">
      <p className="text-sm font-bold">{language.ranking}</p>
      <div className="flex flex-col pl-3">
        <p className="w-60 truncate font-medium sm:w-96 md:w-full">{language.name}</p>
        <p className="mb-4 w-60 truncate sm:w-96 md:w-full" color="gray.500">
          {language.xps.toLocaleString()}
        </p>
      </div>
    </div>
  )
}
