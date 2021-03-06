import { Release } from '@/components/metrics/Trakt'
import fetcher from '@/lib/fetcher'
import { WatchedMovies } from 'lib/types'
import useSWR from 'swr'

export default function MoviesWatched(): JSX.Element {
  const { data } = useSWR<WatchedMovies>('/api/movies-watched', fetcher)

  if (!data) {
    return null
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
      {data.movies.map((movie, index) => (
        <Release ranking={`Movie-number-${index + 1}`} key={movie.id} {...movie} />
      ))}
    </div>
  )
}
