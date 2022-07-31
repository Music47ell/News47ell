import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { TraktRelease } from 'lib/types'

export default function Release(release: TraktRelease): JSX.Element {
  return (
    <div className="m-auto">
      <div className="relative inline-block">
        <Link href={release.link} target="_blank" rel="noopener noreferrer">
          <Image alt="Release Poster" height={750} width={500} src={release.poster} />
        </Link>
      </div>
    </div>
  )
}
