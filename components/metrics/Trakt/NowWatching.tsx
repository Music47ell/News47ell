import { SiTrakt } from 'react-icons/si'
import { default as Image } from '@/components/Image'
import fetcher from '@/lib/fetcher'
import { NowWatchingRelease } from 'lib/types'
import useSWR from 'swr'

export default function NowWatching(): JSX.Element {
  const { data } = useSWR<NowWatchingRelease>('/api/now-watching', fetcher)

  return data?.isWatching ? (
    <div className="flex items-start p-2 m-auto mt-4 mb-4 w-72 rounded-lg border border-primary text-muted">
      <Image
        alt="Trakt"
        className="w-60 h-60 rounded-lg"
        height={60}
        width={60}
        src={data?.poster || '/images/brand/logo.png'}
      />
      <div className="flex flex-col justify-center items-start ml-3">
        {data?.episodeTitle ? (
          <p className="w-48 font-medium truncate">{data.episodeTitle}</p>
        ) : (
          <p className="w-48 font-medium truncate">Not Watching</p>
        )}
        <p className="w-48 truncate">{data?.title ?? 'Trakt'}</p>
      </div>
      <SiTrakt className="fill-trakt" />
    </div>
  ) : null
}
