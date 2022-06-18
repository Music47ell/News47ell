import { default as Link } from '@/components/Link'
import formatDate from '@/utils/formatDate'
import { RaindropCard } from 'lib/types'

export default function BookmarkCard(bookmark: RaindropCard): JSX.Element {
  const title = bookmark.title
    .replace('- Chrome Web Store', '')
    .replace('- Visual Studio Marketplace', '')
    .split(':')[0]

  return (
    <div className="flex py-4">
      <div className="w-full">
        <ul>
          <Link href={bookmark.link}>
            <li className="text-base cursor-pointer hover:text-muted-hover">{title}</li>
            <time className="text-xs cursor-pointer text-muted">
              {formatDate(bookmark.lastUpdate)}
            </time>
            <p className="text-xs cursor-pointer text-muted">{bookmark.tags.join(', ')}</p>
          </Link>
        </ul>
      </div>
    </div>
  )
}
