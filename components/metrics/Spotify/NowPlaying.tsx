import { NowPlayingSong } from 'lib/types'
import useSWR from 'swr'

import { SpotifyIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { useSafePalette } from '@/hooks/usePalette'
import fetcher from '@/lib/fetcher'
import hexToRGB from '@/utils/hex-to-rgb'

export default function NowPlaying(): JSX.Element {
	const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher)
	const { data: palette } = useSafePalette(data?.albumImageUrl || null)

	const light = palette?.lightVibrant
	const dark = palette?.darkVibrant
	const vibrant = palette?.vibrant
	const darkWithOpacity = hexToRGB(palette?.darkVibrant, 0.47)

	return data?.isPlaying ? (
		<div
			style={{ background: darkWithOpacity, color: vibrant, border: `1px solid ${dark}` }}
			className="relative my-4 flex w-full items-center rounded-md p-2"
		>
			<Image
				alt="Spotify"
				className="h-16 w-16 rounded-md"
				height={64}
				width={64}
				src={data?.albumImageUrl || '/images/brand/logo.png'}
			/>
			<div className="ml-3 flex flex-col items-start justify-center text-ellipsis">
				{data?.songUrl ? (
					<Link className="w-48 text-inherit" href={data.songUrl}>
						<p className="text-sm font-medium">{data.title}</p>
					</Link>
				) : (
					<p className="w-48 font-medium">Not Playing</p>
				)}
				<p
					style={{
						color: light,
					}}
					className="w-48"
				>
					{data?.artist ?? 'Spotify'}
				</p>
			</div>
			<div className="absolute bottom-1.5 right-1.5">
				<SpotifyIcon className="block h-6 w-6 fill-nfh-accent-primary" />
			</div>
		</div>
	) : (
		<div className="flex w-full flex-row-reverse items-center p-2">
			<SpotifyIcon className="block h-6 w-6 fill-nfh-accent-primary" />
			<div className="inline-flex w-full max-w-full flex-col truncate sm:flex-row">
				<p className="font-medium">Not Playing</p>
			</div>
		</div>
	)
}
