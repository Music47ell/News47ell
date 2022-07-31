import { TraktIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import fetcher from '@/lib/fetcher'
import { NowWatchingRelease } from 'lib/types'
import useSWR from 'swr'

export default function NowWatching(): JSX.Element {
  const { data } = useSWR<NowWatchingRelease>('/api/now-watching', fetcher)

  return data?.isWatching ? (
    <div className="m-auto my-4 flex w-72 items-start rounded-lg border border-nfh-accent-primary p-2">
      <Image
        alt="Trakt"
        className="h-60 w-60 rounded-lg"
        height={60}
        width={60}
        src={data?.poster || '/images/brand/logo.png'}
      />
      <div className="ml-3 flex flex-col items-start justify-center">
        {data?.episodeTitle ? (
          <p className="w-48 truncate font-medium">{data.episodeTitle}</p>
        ) : (
          <p className="w-48 truncate font-medium">Not Watching</p>
        )}
        <p className="w-48 truncate">{data?.title ?? 'Trakt'}</p>
      </div>
      <TraktIcon className="block h-6 w-6 fill-nfh-accent-primary" />
    </div>
  ) : null
}
