import { default as Image } from '@/components/Image'
import { Song } from 'lib/types'

export default function Track(track: Song): JSX.Element {
  return (
    <div className="flex flex-row py-4 w-full border-b">
      <p className="items-baseline text-sm font-bold">{track.ranking}</p>
      <div className="pl-3">
        <Image
          src={track.albumImage}
          width={100}
          height={100}
          alt={track.album}
          title={track.album}
        />
      </div>
      <div className="flex flex-col pl-3">
        <a
          className="w-60 sm:w-96 md:w-full font-medium truncate"
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {track.title}
        </a>
        <p className="mb-4 w-60 sm:w-96 md:w-full truncate" color="gray.500">
          {track.artist}
        </p>
      </div>
    </div>
  )
}
