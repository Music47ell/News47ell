'use client'

import { Song } from 'lib/types'
import { useState } from 'react'

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
		<div className="flex flex-col">
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

				<div className="ml-4 mr-2">
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
			</div>
			{track.audioUrl ? (
				<audio controls>
					<source src={track.audioUrl} type="audio/mpeg" />
				</audio>
			) : null}
		</div>
	)
}
