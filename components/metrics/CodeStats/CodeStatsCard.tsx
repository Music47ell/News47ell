import { ExternalIcon, ChevronUpIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { LoadingSpinner } from '@/components/UI/LoadingSpinner'
import { useCodeStats } from '@/hooks/useCodeStats'

export default function CodeStatsCard(): JSX.Element {
  const { level, link, totalXP, previousXP, newXP, isLoading } = useCodeStats()
  return (
    <div className="flex relative flex-col p-4 w-full text-nfh-text-primary bg-nfh-background-secondary rounded">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center">
            Level {level}
            {link && (
              <Link href={link} aria-label={`Link to ${link}`}>
                <ExternalIcon className="block ml-1 w-6 h-6 fill-nfh-accent-primary" />
              </Link>
            )}
          </div>
          <div>
            <div className="flex justify-between items-baseline mt-2 text-3xl font-bold">
              {totalXP.toLocaleString('en', { notation: 'compact' })}
              <span className="ml-2 text-sm font-medium leading-5">
                from {previousXP.toLocaleString('en', { notation: 'compact' })}
              </span>
              <span
                data-tip={'Increased by'}
                className="inline-flex items-baseline py-0.5 px-2.5 md:mt-2 lg:mt-0 ml-auto text-sm font-medium leading-5 text-green-400 bg-nfh-background-primary rounded-full"
              >
                Increased by
                <ChevronUpIcon className="inline self-center mr-0.5 w-6 h-6 fill-nfh-accent-primary" />
                <span className="sr-only">{'Increased by'}</span>
                {newXP.toLocaleString('en', { notation: 'compact' })}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
