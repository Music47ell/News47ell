import { Release } from '@/components/metrics/Trakt'
import fetcher from '@/lib/fetcher'
import { WatchedShows } from 'lib/types'
import useSWR from 'swr'

export default function ShowsWatched(): JSX.Element {
  const { data } = useSWR<WatchedShows>('/api/shows-watched', fetcher)

  if (!data) {
    return null
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 pb-8 text-sm">
      {data.shows.map((show, index) => (
        <Release ranking={`Show-number-${index + 1}`} key={show.id} {...show} />
      ))}
    </div>
  )
}
