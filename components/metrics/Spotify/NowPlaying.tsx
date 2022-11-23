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
	const { data: palette } = useSafePalette(data?.albumImageUrl || '/images/brand/logo.png')

	const light = palette?.lightVibrant
	const dark = palette?.darkVibrant
	const vibrant = palette?.vibrant
	const darkWithOpacity = hexToRGB(palette?.darkVibrant, 0.47)

	return data?.isPlaying ? (
		<div
			style={{ background: darkWithOpacity, color: vibrant, border: `1px solid ${dark}` }}
			className="relative my-4 mx-auto flex w-80 items-center rounded-md p-2"
		>
			<Image
				alt="Spotify"
				className="h-16 w-16 rounded-lg"
				height={64}
				width={64}
				src={data?.albumImageUrl || '/images/brand/logo.png'}
			/>
			<div className="ml-3 flex flex-col items-start justify-center">
				{data?.songUrl ? (
					<Link
						className="w-48 translate-x-0 overflow-hidden text-ellipsis
					 text-inherit"
						href={data.songUrl}
					>
						<p className="text-sm font-medium">{data.title}</p>
					</Link>
				) : (
					<p className="w-48 truncate font-medium">Not Playing</p>
				)}
				<p
					style={{
						color: light,
					}}
					className=" w-48 truncate"
				>
					{data?.artist ?? 'Spotify'}
				</p>
			</div>
			<div className="absolute top-1.5 right-1.5">
				<SpotifyIcon className="block h-6 w-6 fill-nfh-accent-primary" />
			</div>
		</div>
	) : null
}
