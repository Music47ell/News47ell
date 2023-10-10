import { News47ell } from '@/components/icons'
import { RSSIcon, XIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function Header() {
	return (
		<header className="flex w-full items-center justify-between bg-nfh-background-secondary px-6 py-4">
			<div>
				<a href="/" aria-label={siteMetadata.title}>
					<News47ell className="m-auto block h-10 w-auto" />
				</a>
			</div>
			<div className="flex space-x-4">
				<Link href={`https://twitter.com/${siteMetadata.username}`}>
					<XIcon className="h-6 w-6" />
				</Link>
				<Link href={`${siteMetadata.siteUrl}/feed.xml`}>
					<RSSIcon className="h-6 w-6" />
				</Link>
			</div>
		</header>
	)
}
