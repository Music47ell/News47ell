import { RaindropStats, RaindropStatsCard } from 'lib/types'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

export function useRaindropStats(): RaindropStatsCard {
	const { data, error } = useSWR<RaindropStats>(`/api/raindrop-stats/`, fetcher)

	const bookmarksCount = data?.items[0].count
	const lastUpdate = data?.meta.changedBookmarksDate

	return {
		bookmarksCount,
		lastUpdate,
		isLoading: !error && !data,
		isError: error,
	}
}
