'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { PostView } from '@/lib/types'

interface ViewsCounterProps {
	slug: string
	trackView: boolean
}

const ViewsCounter: React.FC<ViewsCounterProps> = ({ slug, trackView }) => {
	const { data } = useSWR<PostView>(`/api/views/${slug}`, fetcher)
	const [views, setViews] = useState(0)
	const viewsCount = new Number(data?.count) as number

	useEffect(() => {
		if (data?.count) {
			const increment = Math.ceil(viewsCount / 50) // Adjust the increment value as per your requirement
			let currentViews = 0

			const timer = setInterval(() => {
				currentViews += increment
				if (currentViews >= viewsCount) {
					currentViews = viewsCount
					clearInterval(timer)
				}
				setViews(currentViews)
			}, 30) // Adjust the interval time as per your requirement

			return () => {
				clearInterval(timer)
			}
		}
	}, [data?.count, viewsCount])

	useEffect(() => {
		const registerView = () => {
			fetch(`/api/views/${slug}`, {
				method: 'POST',
			})
		}

		if (process.env.NODE_ENV === 'production' && trackView) {
			registerView()
		}
	}, [slug, trackView])

	return (
		<div className="flex items-center">
			<span className="font-mono text-sm tracking-tighter">
				{data ? `${views.toLocaleString()} views` : '--- views'}
			</span>
		</div>
	)
}

export default ViewsCounter
