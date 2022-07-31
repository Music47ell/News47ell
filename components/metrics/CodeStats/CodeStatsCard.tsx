import { ExternalIcon, ChevronUpIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { LoadingSpinner } from '@/components/UI/LoadingSpinner'
import { useCodeStats } from '@/hooks/useCodeStats'

export default function CodeStatsCard(): JSX.Element {
  const { level, link, totalXP, previousXP, newXP, isLoading } = useCodeStats()
  return (
    <div className="relative flex w-full flex-col rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center">
            Level {level}
            {link && (
              <Link href={link} aria-label={`Link to ${link}`}>
                <ExternalIcon className="ml-1 block h-6 w-6 fill-nfh-accent-primary" />
              </Link>
            )}
          </div>
          <div>
            <div className="mt-2 flex items-baseline justify-between text-3xl font-bold">
              {totalXP.toLocaleString('en', { notation: 'compact' })}
              <span className="ml-2 text-sm font-medium leading-5">
                from {previousXP.toLocaleString('en', { notation: 'compact' })}
              </span>
              <span
                data-tip={'Increased by'}
                className="ml-auto inline-flex items-baseline rounded-full bg-nfh-background-primary py-0.5 px-2.5 text-sm font-medium leading-5 text-green-400 md:mt-2 lg:mt-0"
              >
                Increased by
                <ChevronUpIcon className="mr-0.5 inline h-6 w-6 self-center fill-nfh-accent-primary" />
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
