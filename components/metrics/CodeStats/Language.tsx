import { TLanguage } from 'lib/types'

export default function Language(language: TLanguage): JSX.Element {
  return (
    <div className="flex flex-row items-baseline mt-8 w-full border-b">
      <p className="text-sm font-bold">{language.ranking}</p>
      <div className="flex flex-col pl-3">
        <p className="w-60 sm:w-96 md:w-full font-medium truncate">{language.name}</p>
        <p className="mb-4 w-60 sm:w-96 md:w-full truncate" color="gray.500">
          {language.xps.toLocaleString()}
        </p>
      </div>
    </div>
  )
}
