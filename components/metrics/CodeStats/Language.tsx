import { TLanguage } from 'lib/types'

export default function Language(language: TLanguage): JSX.Element {
  return (
    <div className="flex items-center rounded-md bg-nfh-background-secondary p-2">
      <div className="mr-2 ml-4">
        <p className="text-sm font-bold">{language.ranking}</p>
        <div className="text-base font-medium text-nfh-text-primary">{language.name}</div>
        <div className="-mt-1 text-sm text-nfh-text-secondary">{language.xps.toLocaleString()}</div>
      </div>
    </div>
  )
}
