import { LoadingSpinner } from '@/components/UI/LoadingSpinner'
import { useTrakt } from '@/hooks/useTrakt'

export default function TraktCard(): JSX.Element {
  const { showsWatched, showsMinutes, episodesWatched, moviesWatched, moviesMinutes, isLoading } =
    useTrakt()
  return (
    <div className="p-4 w-full rounded border border-nfh-accent-primary">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2 className="mb-6 text-xl">Movie & TV show stats</h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-1">
            <div>
              <p className="mb-1 text-4xl font-black">{moviesWatched}</p>
              <p className="text-sm">Movies</p>
            </div>
            <div>
              <p className="mb-1 text-4xl font-black">{showsWatched}</p>
              <p className="text-sm">TV Shows</p>
            </div>
            <div>
              <p className="mb-1 text-4xl font-black">{episodesWatched}</p>
              <p className="text-sm">Episodes</p>
            </div>
            <div>
              <p className="mb-1 text-4xl font-black">
                {((showsMinutes + moviesMinutes) / 60 / 24).toFixed(2)}
              </p>
              <p className="text-sm">Total days</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
