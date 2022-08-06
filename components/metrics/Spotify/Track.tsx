import { default as Image } from '@/components/Image'
import { Song } from 'lib/types'
import { PlayIcon, PauseIcon } from '@/components/icons'

export default function Track(track: Song): JSX.Element {
  return (
    <div className="flex items-center rounded-md border border-nfh-accent-primary p-2">
      <div className="mr-6 hidden w-5 flex-none place-content-center text-sm text-gray-500 sm:grid">
        {track.ranking}
      </div>

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
        <div className="text-base font-medium text-black">{track.title}</div>
        <div className="-mt-1 text-sm text-gray-600">{track.artist}</div>
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
