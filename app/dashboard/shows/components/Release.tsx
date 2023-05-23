'use client'

import { useState } from 'react'

import { PlayIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { BorderEffect } from '@/components/UI'
import { useSafePalette } from '@/hooks/usePalette'
import { TraktRelease } from '@/lib/types'
import hexToRGB from '@/utils/hex-to-rgb'

export default function Release(release: TraktRelease): JSX.Element {
	const [isHover, setIsHover] = useState(false)

	const handleMouseEnter = () => {
		setIsHover(true)
	}

	const handleMouseLeave = () => {
		setIsHover(false)
	}

	const { data: palette } = useSafePalette(`https://image.tmdb.org/t/p/original${release.poster}`)

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
				className="relative w-32 flex-none"
			>
				<Image
					draggable={false}
					className="rounded"
					width={300}
					height={500}
					title={release.title}
					alt={release.title}
					src={`https://image.tmdb.org/t/p/original${release.poster}`}
				/>
			</div>

			<div className="ml-4 mr-2">
				<Link href={`https://www.imdb.com/title/${release.link}`}>
					<div
						style={{
							color: light,
						}}
						className="text-base font-medium"
					>
						{release.title}
					</div>
				</Link>
			</div>

			{release.trailer ? (
				<Link
					href={`https://www.youtube.com/watch?v=${release.trailer}`}
					className="ml-auto hover:scale-105"
				>
					<PlayIcon className="block h-6 w-6 fill-nfh-accent-primary text-3xl hover:fill-nfh-accent-secondary" />
				</Link>
			) : null}
		</div>
	)
}
