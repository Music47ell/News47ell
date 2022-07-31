import { SpotifyIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import fetcher from '@/lib/fetcher'
import { NowPlayingSong } from 'lib/types'
import useSWR from 'swr'

export default function NowPlaying(): JSX.Element {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher)

  return data?.isPlaying ? (
    <div className="m-auto my-4 flex w-72 items-start rounded-lg border border-nfh-accent-primary p-2">
      <Image
        alt="Spotify"
        className="h-60 w-60 rounded-lg"
        height={60}
        width={60}
        src={data?.albumImageUrl || '/images/brand/logo.png'}
      />
      <div className="ml-3 flex flex-col items-start justify-center">
        {data?.songUrl ? (
          <a
            className="w-48 truncate font-medium"
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.title}
          </a>
        ) : (
          <p className="w-48 truncate font-medium">Not Playing</p>
        )}
        <p className=" w-48 truncate">{data?.artist ?? 'Spotify'}</p>
      </div>
      <SpotifyIcon className="block h-6 w-6 fill-nfh-accent-primary" />
    </div>
  ) : null
}
