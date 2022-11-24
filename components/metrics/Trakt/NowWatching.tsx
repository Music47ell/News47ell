import { NowWatchingRelease } from 'lib/types'
import useSWR from 'swr'

import { TraktIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { useSafePalette } from '@/hooks/usePalette'
import fetcher from '@/lib/fetcher'
import hexToRGB from '@/utils/hex-to-rgb'

export default function NowWatching(): JSX.Element {
	const { data } = useSWR<NowWatchingRelease>('/api/now-watching', fetcher)

	const { data: palette } = useSafePalette(
		`https://image.tmdb.org/t/p/original/${data?.poster}` || '/images/brand/logo.png'
	)

	const light = palette?.lightVibrant
	const dark = palette?.darkVibrant
	const vibrant = palette?.vibrant
	const darkWithOpacity = hexToRGB(palette?.darkVibrant, 0.47)

	return data?.isWatching ? (
		<div
			style={{ background: darkWithOpacity, color: vibrant, border: `1px solid ${dark}` }}
			className="relative my-4 mx-auto flex items-center rounded-md p-2"
		>
			<Image
				alt="Trakt"
				className="h-60 w-60 rounded-md"
				height={64}
				width={64}
				src={`https://image.tmdb.org/t/p/original/${data?.poster}` || '/images/brand/logo.png'}
			/>
			<div className="ml-3 flex flex-col items-start justify-center text-ellipsis">
				{data?.episodeTitle ? (
					<p className="w-48 text-inherit">{data.episodeTitle}</p>
				) : (
					<p className="w-48 font-medium">Not Watching</p>
				)}
				<p
					style={{
						color: light,
					}}
					className="w-48"
				>
					{data?.title ?? 'Trakt'}
				</p>
			</div>
			<div className="absolute bottom-1.5 right-1.5">
				<TraktIcon className="block h-6 w-6 fill-nfh-accent-primary" />
			</div>
		</div>
	) : null
}
