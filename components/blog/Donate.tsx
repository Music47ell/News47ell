import { GitHubHeartIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'

export default function Donate(): JSX.Element {
	return (
		<div className="bg-nfh-background-secondary p-4" role="alert">
			<div className="flex items-center">
				<span className="mr-2 h-5 w-5" role="img" aria-label="heart">
					💖
				</span>
				<span className="sr-only">Info</span>
				<h3 className="text-lg font-medium text-nfh-text-primary">
					Now you can sponsor me via GitHub Sponsors!
				</h3>
			</div>
			<div className="mt-2 mb-4 text-sm text-nfh-text-primary">
				If you enjoy my work, consider supporting me via GitHub Sponsors or through other means.
			</div>
			<div className="flex">
				<Link
					href="https://github.com/sponsors/Music47ell"
					className="group mr-2 inline-flex items-center rounded-lg bg-gray-700 px-3 py-1.5 text-center text-xs font-medium !text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
				>
					<GitHubHeartIcon className="mr-2 h-4 w-4 group-hover:scale-110" />
					Sponsor
				</Link>
				<Link
					href="/donate"
					className="mr-2 inline-flex items-center rounded-lg bg-gray-700 px-3 py-1.5 text-center text-xs font-medium !text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
				>
					Other ways to support
				</Link>
			</div>
		</div>
	)
}
