'use client'

import useSWR from 'swr'

import { default as Link } from '@/components/Link'
import fetcher from '@/lib/fetcher'
import { PostView } from '@/lib/types'
import { displayDate } from '@/utils/format-time-date'

export default function BlogPostCard({ title, slug }: { title: string; slug: string }) {
	const { data } = useSWR<PostView[]>('/api/views', fetcher)
	const viewsForSlug = data && data?.find((view) => view.slug === slug)
	const views = new Number(viewsForSlug?.count || 0)

	return (
		<Link key={slug} className="mb-4 flex flex-col space-y-1" href={`/blog/${slug}`}>
			<div className="flex w-full flex-col">
				<p>{title}</p>
				<span className="flex flex-row">
					<p className="font-mono text-sm tracking-tighter text-neutral-500">
						{data ? `${views.toLocaleString()} views` : '--- views'}
					</p>
				</span>
			</div>
		</Link>
	)
}
