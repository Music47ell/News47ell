'use client'

import useSWR from 'swr'

import { TraktIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { useSafePalette } from '@/hooks/usePalette'
import fetcher from '@/lib/fetcher'
import { NowWatchingRelease } from '@/lib/types'
import hexToRGB from '@/utils/hex-to-rgb'

export default function NowWatching(): JSX.Element {
	const { data } = useSWR<NowWatchingRelease>('/api/trakt/now-watching', fetcher)

	const { data: palette } = useSafePalette(
		data?.isWatching ? `https://image.tmdb.org/t/p/original/${data?.poster}` : null
	)

	const light = palette?.lightVibrant
	const dark = palette?.darkVibrant
	const vibrant = palette?.vibrant
	const darkWithOpacity = hexToRGB(palette?.darkVibrant, 0.47)

	return data?.isWatching ? (
		<div
			style={{ background: darkWithOpacity, color: vibrant, border: `1px solid ${dark}` }}
			className="relative my-4 flex w-full items-center rounded-md p-2"
		>
			<Image
				alt="Trakt"
				className="h-60 w-40 rounded-md"
				height={240}
				width={160}
				src={`https://image.tmdb.org/t/p/original/${data?.poster}` || '/images/brand/logo.png'}
			/>
			<div className="ml-3 flex flex-col items-start justify-center text-ellipsis">
				{data?.episodeTitle && <p className="text-inherit">{data.episodeTitle}</p>}
				<p
					style={{
						color: light,
					}}
				>
					{data?.title ?? 'Trakt'}
				</p>
			</div>
			<div className="absolute bottom-1.5 right-1.5">
				<TraktIcon className="block h-6 w-6 fill-nfh-accent-primary" />
			</div>
		</div>
	) : (
		<div className="flex w-full flex-row-reverse items-center">
			<TraktIcon className="block h-6 w-6 fill-nfh-accent-primary" />
			<div className="inline-flex w-full max-w-full flex-col truncate sm:flex-row">
				<p className="font-medium">Not Watching</p>
			</div>
		</div>
	)
}
