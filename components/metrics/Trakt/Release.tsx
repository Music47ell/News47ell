import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { TraktRelease } from 'lib/types'
import { PlayIcon } from '@/components/icons'
import { BorderEffect } from '@/components/UI'

export default function Release(release: TraktRelease): JSX.Element {
  return (
    <div className="group flex items-center rounded-md bg-nfh-background-secondary p-2 transition duration-500 hover:scale-100">
      <BorderEffect />
      <div className="relative w-32 flex-none">
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

      <div className="mr-2 ml-4">
        <Link
          href={`https://www.imdb.com/title/${release.link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="text-base font-medium text-nfh-text-primary">{release.title}</div>
        </Link>
      </div>

      {release.trailer ? (
        <Link
          href={`https://www.youtube.com/watch?v=${release.trailer}`}
          className="ml-auto text-gray-800 hover:scale-105"
        >
          <PlayIcon className="block h-6 w-6 fill-nfh-accent-primary text-3xl hover:fill-nfh-accent-secondary" />
        </Link>
      ) : null}
    </div>
  )
}
