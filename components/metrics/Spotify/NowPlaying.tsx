'use client'

import useSWR from 'swr'

import { SpotifyIcon } from '@/components/icons'
import { MediaCard } from '@/components/UI'
import fetcher from '@/lib/fetcher'
import { NowPlayingSong } from '@/lib/types'

export default function NowPlaying(): JSX.Element {
	const { data } = useSWR<NowPlayingSong>('/api/spotify/now-playing', fetcher)

	return data?.isPlaying ? (
		<div>
			{data.playingType === 'episode' ? (
				<MediaCard title={data.title} image={data.episodeImageUrl} url={data.episodeUrl} />
			) : (
				<MediaCard title={data.title} image={data.albumImageUrl} url={data.songUrl} />
			)}
		</div>
	) : (
		<div className="flex w-full flex-row-reverse items-center">
			<SpotifyIcon className="block h-6 w-6 fill-nfh-accent-primary" />
			<div className="inline-flex w-full max-w-full flex-col truncate sm:flex-row">
				<p className="font-medium">Not Playing</p>
			</div>
		</div>
	)
}
