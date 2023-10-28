'use client'

import { useEffect } from 'react'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { PostView } from '@/lib/types'

export default function ViewsCounter({ slug, trackView }: { slug: string; trackView: boolean }) {
	const { data } = useSWR<PostView>(`/api/views/${encodeURIComponent(slug)}`, fetcher)
	const views = new Number(data?.count || 0)

	useEffect(() => {
		const registerView = () => {
			fetch(`/api/views/${encodeURIComponent(slug)}`, {
				method: 'POST',
			})
		}

		if (process.env.NODE_ENV === 'production' && trackView) {
			registerView()
		}
	}, [slug, trackView])

	return (
		<p className="shrink-0 font-mono text-sm tracking-tighter text-nfh-text-primary">
			{data ? `${views.toLocaleString()} views` : '--- views'}
		</p>
	)
}
