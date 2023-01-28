import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { Lastfm } from '@/lib/types'

export function useLastfm() {
	const { data, error, isLoading } = useSWR<Lastfm>('/api/lastfm-stats', fetcher)

	const playCount = data?.user?.playcount
	const artistsCount = data?.user?.artist_count
	const tracksCount = data?.user?.track_count
	const registered = data?.user?.registered?.['#text']
	const registeredDate = new Date().getFullYear() - new Date(registered * 1000).getFullYear()
	const days = Math.round(
		(new Date().getTime() - new Date(registered * 1000).getTime()) / (1000 * 60 * 60 * 24)
	)
	const averagePlayCount = playCount ? Math.round(playCount / days) : 0
	const url = data?.user?.url
	const name = data?.user?.name

	return {
		playCount,
		artistsCount,
		tracksCount,
		averagePlayCount,
		registeredDate,
		url,
		name,
		isLoading,
		isError: error,
	}
}
