'use client'

import { useEffect } from 'react'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { PostView } from '@/lib/types'

export default function ViewsCounter({ slug }: { slug: string }) {
	const { data } = useSWR<PostView>(`/api/views/${slug}`, fetcher)
	const views = data && new Number(data?.count || 0)

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			fetch(`/api/views/${slug}`, {
				method: 'POST',
			})
		}
	}, [slug])

	return (
		<p className="font-mono text-sm tracking-tighter">
			{views ? `${views.toLocaleString()} views` : '--- views'}
		</p>
	)
}
