import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { Trakt, TraktCard } from '@/lib/types'

export function useTrakt(): TraktCard {
  const { data, error } = useSWR<Trakt>('/api/trakt-stats', fetcher)

  const moviesWatched = data?.movies.watched || 0
  const showsWatched = data?.shows.watched || 0
  const moviesMinutes = data?.movies.minutes || 0
  const showsMinutes = data?.episodes.minutes || 0
  const episodesWatched = data?.episodes.watched || 0

  return {
    moviesWatched,
    showsWatched,
    moviesMinutes,
    showsMinutes,
    episodesWatched,
    isLoading: !error && !data,
    isError: error,
  }
}
