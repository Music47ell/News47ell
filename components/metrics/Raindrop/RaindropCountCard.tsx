import { LoadingSpinner } from '@/components/UI/LoadingSpinner'
import { useRaindropStats } from '@/hooks/useRaindropStats'

export default function RaindropCountCard(): JSX.Element {
  const { bookmarksCount, isLoading } = useRaindropStats()
  return (
    <div className="flex relative flex-col p-4 w-full text-nfh-text-primary bg-nfh-background-secondary rounded">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center">Bookmarks saved on Raindrop</div>
          <div>
            <p className="flex justify-between items-baseline mt-2 text-3xl font-bold">
              {bookmarksCount.toLocaleString('en', { notation: 'compact' })}
            </p>
          </div>
        </>
      )}
    </div>
  )
}
