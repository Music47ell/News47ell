import fetcher from '@/lib/fetcher'
import useSWR from 'swr'
import { OGMeta } from '@/lib/types'

export function useOGMeta(url: string) {
	const { data, error } = useSWR<OGMeta>(`/api/og/meta?url=${url}`, fetcher)

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	}
}
