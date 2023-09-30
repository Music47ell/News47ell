'use client'

import useSWR from 'swr'

import { LastfmIcon } from '@/components/icons'
import { MediaCard } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/lib/fetcher'

export type NowPlayingSong = {
	isPlaying: boolean
	title: string
	albumImageUrl: string
	songUrl: string
}

export default function NowPlaying(): JSX.Element {
	const { data } = useSWR<NowPlayingSong>(
		`${siteMetadata.apiOrigin}/api/lastfm/now-playing`,
		fetcher
	)

	return data?.isPlaying ? (
		<div>
			<MediaCard title={data.title} image={data.albumImageUrl} url={data.songUrl} />
		</div>
	) : (
		<div className="flex w-full flex-row-reverse items-center">
			<LastfmIcon className="block h-6 w-6 fill-nfh-accent-primary" />
			<div className="inline-flex w-full max-w-full flex-col truncate sm:flex-row">
				<p className="font-medium">Not Playing</p>
			</div>
		</div>
	)
}
