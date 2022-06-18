import { SiSpotify } from 'react-icons/si'
import { default as Image } from '@/components/Image'
import fetcher from '@/lib/fetcher'
import { NowPlayingSong } from 'lib/types'
import useSWR from 'swr'

export default function NowPlaying(): JSX.Element {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher)

  return data?.isPlaying ? (
    <div className="flex items-start p-2 m-auto mt-4 mb-4 w-72 rounded-lg border border-primary text-muted">
      <Image
        alt="Spotify"
        className="w-60 h-60 rounded-lg"
        height={60}
        width={60}
        src={data?.albumImageUrl || '/images/brand/logo.png'}
      />
      <div className="flex flex-col justify-center items-start ml-3">
        {data?.songUrl ? (
          <a
            className="w-48 font-medium truncate"
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.title}
          </a>
        ) : (
          <p className="w-48 font-medium truncate">Not Playing</p>
        )}
        <p className=" w-48 truncate">{data?.artist ?? 'Spotify'}</p>
      </div>
      <SiSpotify className="fill-spotify" />
    </div>
  ) : null
}
