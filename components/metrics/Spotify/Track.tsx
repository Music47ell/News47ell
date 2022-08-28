import { default as Image } from '@/components/Image'
import { Song } from 'lib/types'
import { PlayIcon, PauseIcon } from '@/components/icons'
import { BorderEffect } from '@/components/UI'

export default function Track(track: Song): JSX.Element {
	return (
		<div className="group flex items-center rounded-md bg-nfh-background-secondary p-2 transition duration-500 hover:scale-100">
			<BorderEffect />
			<div className="relative h-32 w-32 flex-none">
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
				<div className="text-base font-medium text-nfh-text-primary">{track.title}</div>
				<div className="-mt-1 text-sm text-nfh-text-secondary">{track.artist}</div>
			</div>

			{track.audioUrl ? (
				<button
					onClick={track.onToggle}
					className="ml-auto text-gray-800 hover:scale-105"
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
