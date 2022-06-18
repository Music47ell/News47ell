import { BiLinkExternal, BiChevronUp } from 'react-icons/bi'
import { default as Link } from '@/components/Link'
import { LoadingSpinner } from '@/components/UI/LoadingSpinner'
import { useCodeStats } from '@/hooks/useCodeStats'

export default function CodeStatsCard(): JSX.Element {
  const { level, link, totalXP, previousXP, newXP, isLoading } = useCodeStats()
  return (
    <div className="p-4 w-full rounded border border-gray-200 dark:border-gray-500">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center">
            {`C::S Level ${level}`}
            {link && (
              <Link href={link} aria-label={`Link to ${link}`}>
                <BiLinkExternal className="ml-1" />
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
                className="inline-flex items-baseline py-0.5 px-2.5 md:mt-2 lg:mt-0 ml-auto text-sm font-medium leading-5 text-green-400 rounded-full bg-off-main"
              >
                Increased by
                <BiChevronUp className="flex-shrink-0 self-center mr-0.5" />
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
