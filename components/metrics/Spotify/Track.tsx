import { Song } from 'lib/types'
import { useState } from 'react'

import { PauseIcon, PlayIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { BorderEffect } from '@/components/UI'
import { useSafePalette } from '@/hooks/usePalette'
import hexToRGB from '@/utils/hex-to-rgb'

export default function Track(track: Song): JSX.Element {
	const [isHover, setIsHover] = useState(false)

	const handleMouseEnter = () => {
		setIsHover(true)
	}

	const handleMouseLeave = () => {
		setIsHover(false)
	}

	const { data: palette } = useSafePalette(track?.albumImage)

	const light = palette?.lightVibrant
	const dark = palette?.darkVibrant
	const vibrant = palette?.vibrant
	const darkWithOpacity = hexToRGB(palette?.darkVibrant, 0.47)

	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{ background: isHover ? dark : darkWithOpacity, color: vibrant }}
			className="group relative flex cursor-pointer items-center p-2 transition duration-500"
		>
			<BorderEffect bgColor={light} />
			<div
				style={{
					background: light,
				}}
				className="relative h-32 w-32 flex-none"
			>
				<Image
					draggable={false}
					className="rounded"
					width={128}
					height={128}
					title={track.album}
					alt={track.album}
					src={track.albumImage}
				/>
			</div>

			<div className="mr-2 ml-4">
				<div
					style={{
						color: light,
					}}
					className="text-base font-medium"
				>
					{track.title}
				</div>
				<div
					style={{
						color: light,
					}}
					className="-mt-1 text-sm"
				>
					{track.artist}
				</div>
			</div>

			{track.audioUrl ? (
				<button
					onClick={track.onToggle}
					className="ml-auto hover:scale-105"
					aria-label={track.isPlaying ? 'Pause Button' : 'Play Button'}
				>
					{track.isPlaying ? (
						<PauseIcon className="block h-6 w-6 fill-nfh-accent-primary text-3xl hover:fill-nfh-accent-secondary" />
					) : (
						<PlayIcon className="block h-6 w-6 fill-nfh-accent-primary text-3xl hover:fill-nfh-accent-secondary" />
					)}
				</button>
			) : null}
		</div>
	)
}
