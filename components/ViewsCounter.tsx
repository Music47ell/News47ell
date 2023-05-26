'use client'

import { useEffect } from 'react'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { PostView } from '@/lib/types'

export default function ViewsCounter({ slug, trackView }: { slug: string; trackView: boolean }) {
	const { data } = useSWR<PostView>(`/api/views/${slug}`, fetcher)
	const views = new Number(data?.count || 0)

	useEffect(() => {
		const registerView = () => {
			fetch(`/api/views/${slug}`, {
				method: 'POST',
			})
		}

		if (process.env.NODE_ENV === 'production' && trackView) {
			registerView()
		}
	}, [slug])

	return (
		<p className="font-mono text-sm tracking-tighter">
			{data ? `${views.toLocaleString()} views` : '--- views'}
		</p>
	)
}
