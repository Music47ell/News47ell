'use client'

import useSWR from 'swr'

import { TraktIcon } from '@/components/icons'
import { MediaCard } from '@/components/UI'
import fetcher from '@/lib/fetcher'
import { NowWatchingRelease } from '@/lib/types'

export default function NowWatching(): JSX.Element {
	const { data } = useSWR<NowWatchingRelease>('/api/trakt/now-watching', fetcher)

	return data?.isWatching ? (
		<MediaCard title={data.title} image={data.poster} url={data.url} />
	) : (
		<div className="flex w-full flex-row-reverse items-center">
			<TraktIcon className="block h-6 w-6 fill-nfh-accent-primary" />
			<div className="inline-flex w-full max-w-full flex-col truncate sm:flex-row">
				<p className="font-medium">Not Watching</p>
			</div>
		</div>
	)
}
