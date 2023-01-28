import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { Trakt, TraktCard } from '@/lib/types'

export function useTrakt(): TraktCard {
	const { data, error, isLoading } = useSWR<Trakt>('/api/trakt-stats', fetcher)

	const moviesWatched = data?.movies.watched || 0
	const showsWatched = data?.shows.watched || 0
	const moviesMinutes = data?.movies.minutes || 0
	const showsMinutes = data?.episodes.minutes || 0
	const episodesWatched = data?.episodes.watched || 0
	const user = data?.user
	const url = data?.url

	return {
		moviesWatched,
		showsWatched,
		moviesMinutes,
		showsMinutes,
		episodesWatched,
		user,
		url,
		isLoading,
		isError: error,
	}
}
