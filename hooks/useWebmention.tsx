import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { WebMention } from '@/lib/types'

export function useWebmentionBySlug(slug: string) {
	const { data, error, isLoading } = useSWR<WebMention>(`/api/webmention/${slug}`, fetcher)

	return {
		data,
		isLoading,
		isError: error,
	}
}
