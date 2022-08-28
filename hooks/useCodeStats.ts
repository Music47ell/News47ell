import fetcher from '@/lib/fetcher'
import { CodeStats, CodeStatsCard } from 'lib/types'
import useSWR from 'swr'

export function useCodeStats(): CodeStatsCard {
	const { data, error } = useSWR<CodeStats>(`/api/codestats/`, fetcher)

	const totalXP = data?.total_xp || 0
	const newXP = data?.new_xp || 0
	const previousXP = totalXP - newXP || 0
	const level = Math.floor(0.025 * Math.sqrt(totalXP)) || 0
	const link = data?.url
	const user = data?.user

	return {
		totalXP,
		newXP,
		previousXP,
		level,
		link,
		user,
		isLoading: !error && !data,
		isError: error,
	}
}
