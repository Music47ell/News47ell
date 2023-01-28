import { UseViewCountResult, Views } from 'lib/types'
import { useEffect } from 'react'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

export function useViews(): UseViewCountResult {
	const { data, error, isLoading } = useSWR<Views>(`/api/views`, fetcher)

	return {
		views: data?.views,
		isLoading,
		isError: error,
	}
}

export function useViewsBySlug(slug: string): UseViewCountResult {
	const { data, error, isLoading, mutate } = useSWR<Views>(`/api/views/${slug}`, {
		revalidateOnMount: false,
	})

	useEffect(() => {
		mutate(async () => {
			const response = await fetch(`/api/views/${slug}`, { method: 'POST' })

			if (response.ok) {
				return await response.json()
			}
		}, false)
	}, [slug, mutate])

	return {
		views: data?.views,
		isLoading,
		isError: error,
	}
}
