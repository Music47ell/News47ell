import { default as Link } from '@/components/Link'
import { BorderEffect } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'

export default function PostLinks({ path, filePath }: { path: string; filePath: string }) {
	const directUrl = (path: string) =>
		`https://github.com/${siteMetadata.siteRepo}/blob/main/content/${path}`
	const discussUrl = (path: string) =>
		`https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`
	const editUrl = (path: string): string =>
		`https://github.com/${siteMetadata.siteRepo}/edit/main/content/${path}`

	const historyUrl = (path: string): string =>
		`https://github.com/${siteMetadata.siteRepo}/commits/main/content/${path}`

	return (
		<div className="grid grid-cols-2 gap-4 py-4">
			<Link
				href={discussUrl(path)}
				rel="nofollow"
				className="group relative flex items-center bg-nfh-background-secondary p-4 transition duration-500"
			>
				<BorderEffect />
				Discuss on Twitter
			</Link>
			<Link
				href={directUrl(filePath)}
				className="group relative flex items-center bg-nfh-background-secondary p-4 transition duration-500"
			>
				<BorderEffect />
				View on GitHub
			</Link>
			<Link
				href={editUrl(filePath)}
				className="group relative flex items-center bg-nfh-background-secondary p-4 transition duration-500"
			>
				<BorderEffect />
				Edit on GitHub
			</Link>
			<Link
				href={historyUrl(filePath)}
				className="group relative flex items-center bg-nfh-background-secondary p-4 transition duration-500"
			>
				<BorderEffect />
				History on GitHub
			</Link>
		</div>
	)
}
