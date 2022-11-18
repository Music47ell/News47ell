import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { IShare } from 'lib/interfaces'
import { useEffect, useState } from 'react'
import {
	ShareIcon,
	CopyIcon,
	CheckIcon,
	TwitterIcon,
	RedditIcon,
	LinkedInIcon,
	HackerNewsIcon,
	PocketIcon,
} from '@/components/icons'

export default function Share({ title, slug }: IShare): JSX.Element {
	const [isCopied, setIsCopied] = useState(false)
	const [shareSucceed, setShareSucceed] = useState(false)

	const url = `${siteMetadata.siteUrl}/blog/${slug}`
	const twitterLink = `https://twitter.com/intent/tweet/?text=${title}&url=${encodeURIComponent(
		url
	)}/&via=News47ell`
	const pocketLink = `https://getpocket.com/edit?url=${encodeURIComponent(url)}`
	const redditLink = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${title}`
	const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
		url
	)}`
	const hackerNewsLink = `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(
		url
	)}&t=${title}`

	const copyToClipboard = () => {
		setIsCopied(true)
		navigator.clipboard.writeText(url)
		const input = document.getElementById('slug') as HTMLInputElement
		input.select()
		input.setSelectionRange(0, 99999) // for mobile devices
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
	}

	const share = (url: string) => {
		if (navigator.share) {
			try {
				navigator.share({
					title: title,
					text: `${title}`,
					url: url,
				})
			} catch (err) {
				console.error('Error: ' + err)
			}
		}
	}

	useEffect(() => {
		if (navigator.share) {
			setShareSucceed(true)
		} else {
			setShareSucceed(false)
		}
	}, [])

	return (
		<div className="space-y-2 py-6 text-center text-sm">
			{shareSucceed === true && (
				<button onClick={() => share(url)}>
					<ShareIcon className="block h-8 w-8 fill-nfh-accent-primary" />
				</button>
			)}
			{shareSucceed === false && (
				<>
					<div className="flex flex-row items-center justify-center space-x-2">
						<Link href={twitterLink}>
							<TwitterIcon className="block h-6 w-6" />
						</Link>
						<Link href={redditLink}>
							<RedditIcon className="block h-6 w-6" />
						</Link>
						<Link href={linkedinLink}>
							<LinkedInIcon className="block h-6 w-6" />
						</Link>
						<Link href={hackerNewsLink}>
							<HackerNewsIcon className="block h-6 w-6" />
						</Link>
						<Link href={pocketLink}>
							<PocketIcon className="block h-6 w-6" />
						</Link>
					</div>
					<div className="flex flex-row items-center justify-center space-x-2">
						<input
							id="slug"
							type="text"
							className="w-64 rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-800"
							value={url}
							readOnly
						/>
						<button
							onClick={copyToClipboard}
							className="flex flex-row items-center justify-center space-x-2"
						>
							{isCopied ? (
								<CheckIcon
									className={`block h-6 w-6 ${isCopied ? 'fill-green-400' : 'fill-gray-300'}`}
								/>
							) : (
								<CopyIcon
									className={`block h-6 w-6 ${isCopied ? 'fill-green-400' : 'fill-gray-300'}`}
								/>
							)}
						</button>
					</div>
				</>
			)}
		</div>
	)
}
