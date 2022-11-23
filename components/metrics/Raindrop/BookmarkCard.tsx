import { RaindropCard } from 'lib/types'

import { default as Link } from '@/components/Link'
import formatDate from '@/utils/format-date'

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
						<li className="cursor-pointer text-base hover:text-nfh-text-secondary">{title}</li>
						<time className="cursor-pointer text-xs text-nfh-text-secondary">
							{formatDate(bookmark.lastUpdate)}
						</time>
						<p className="cursor-pointer text-xs text-nfh-text-secondary">
							{bookmark.tags.join(', ')}
						</p>
					</Link>
				</ul>
			</div>
		</div>
	)
}
