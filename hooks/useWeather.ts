import { CodeStatsCard, Weather } from 'lib/types'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

export function useWeather() {
	const { data, error, isLoading } = useSWR<Weather>(`/api/weather/`, fetcher)

	const time = data?.time
	const summary = data?.summary
	const temperature = data?.temperature
	const humidity = data?.humidity
	const windSpeed = data?.windSpeed

	return {
		time,
		summary,
		temperature,
		humidity,
		windSpeed,
		isLoading,
		isError: error,
	}
}
