import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { IAuthorsDetails } from '@/lib/interfaces'

export default function AuthorsDetails(author: IAuthorsDetails) {
	return (
		<div
			className={`flex items-center p-4 ${
				author.ranking === 1 ? 'bg-nfh-accent-secondary' : 'bg-nfh-background-secondary'
			}`}
		>
			<div className="p-author h-card">
				<Image
					src={author.avatar}
					alt={author.name}
					className="photo u-photo"
					width={64}
					height={64}
				/>
			</div>
			<div className="ml-4">
				<p className="font-semibold leading-none">{author.name}</p>
				<Link href={author.url} className="mt-2 text-sm text-nfh-text-secondary" rel="author">
					<span>GitHub Link</span>
				</Link>
				{author.ranking === 1 ? (
					<p className="mt-2 whitespace-nowrap bg-gray-800 py-1 px-2.5 text-center align-baseline text-xs font-bold leading-none text-white">
						Author
					</p>
				) : (
					<p className="mt-2 whitespace-nowrap bg-gray-200 py-1 px-2.5 text-center align-baseline text-xs font-bold leading-none text-gray-700">
						Contributor
					</p>
				)}
			</div>
		</div>
	)
}
