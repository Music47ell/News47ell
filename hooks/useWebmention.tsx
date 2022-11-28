import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

export function useWebmentionBySlug(slug: string) {
	const { data, error } = useSWR(`/api/webmention/${slug}`, fetcher)

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	}
}
