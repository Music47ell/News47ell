import { LoadingSpinner } from '@/components/UI/LoadingSpinner'
import { useTrakt } from '@/hooks/useTrakt'
import { default as Link } from '@/components/Link'

export default function TraktCard(): JSX.Element {
  const {
    showsWatched,
    showsMinutes,
    episodesWatched,
    moviesWatched,
    moviesMinutes,
    user,
    url,
    isLoading,
  } = useTrakt()
  return (
    <div className="relative flex w-full flex-col rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-x-0 gap-y-4 md:grid-cols-2 md:gap-x-12">
          <div className="flex items-center justify-between space-x-4">
            <span>Profile</span>

            <div className="flex items-center space-x-2">
              <Link href={url} className="shrink-0">
                @{user}
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-4">
            <span className="shrink-0">Total Days</span>

            <div className="flex items-center space-x-2">
              <div className="truncate">
                {((showsMinutes + moviesMinutes) / 60 / 24).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-4">
            <span className="shrink-0">Shows</span>

            <div className="flex items-center space-x-2">
              <div className="truncate">{showsWatched}</div>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-4">
            <span className="shrink-0">Movies</span>

            <div className="flex items-center space-x-2">
              <div className="truncate">{moviesWatched}</div>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-4">
            <span className="shrink-0">Days spent on shows</span>

            <div className="flex items-center space-x-2">
              <div className="truncate">{(showsMinutes / 60 / 24).toFixed(2)}</div>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span className="shrink-0">Days spent on movies</span>

            <div className="flex items-center space-x-2">
              <div className="truncate">{(moviesMinutes / 60 / 24).toFixed(2)}</div>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span className="shrink-0">Episodes watched</span>

            <div className="flex items-center space-x-2">
              <div className="truncate">{episodesWatched}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
