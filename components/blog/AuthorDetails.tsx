import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function AuthorDetails() {
	const { author } = siteMetadata
	return (
		<div className="flex items-center p-4">
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
			</div>
		</div>
	)
}
