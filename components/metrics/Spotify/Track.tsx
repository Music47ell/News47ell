import { default as Image } from '@/components/Image'
import { Song } from 'lib/types'
import { PlayIcon, PauseIcon } from '@/components/icons'

export default function Track(track: Song): JSX.Element {
  return (
    <div className="flex items-center p-2 rounded-md border border-nfh-accent-primary">
      <div className="hidden sm:grid flex-none place-content-center mr-6 w-5 text-sm text-gray-500">
        {track.ranking}
      </div>

      <div className="relative flex-none w-32 h-32">
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
            <PauseIcon className="block w-6 h-6 text-3xl fill-nfh-accent-primary hover:fill-nfh-accent-secondary" />
          ) : (
            <PlayIcon className="block w-6 h-6 text-3xl fill-nfh-accent-primary hover:fill-nfh-accent-secondary" />
          )}
        </button>
      ) : null}
    </div>
  )
}
