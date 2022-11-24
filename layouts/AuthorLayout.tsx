import { Authors } from 'lib/interfaces'

import { EnvelopeIcon, TwitterIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'
import { getGravatar } from '@/utils/get-gravatar'

export default function AuthorLayout({ author, posts }: Authors): JSX.Element {
	const { name, bio, email, twitter } = author

	return (
		<SectionContainer>
			<div className="items-start space-y-2 pb-8 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
				<div className="flex flex-col items-center space-x-2 pt-8">
					<Image
						src={getGravatar(email, 192)}
						alt="avatar"
						width={192}
						height={192}
						className="h-48 w-48 rounded-full"
					/>
					<h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
					<div className="flex space-x-3 pt-6">
						<Link href={`mailto:${email}`}>
							<EnvelopeIcon className="h-6 w-6 fill-nfh-accent-primary" />
						</Link>
						{twitter && (
							<Link href={`https://twitter.com/${twitter}`}>
								<TwitterIcon className="h-6 w-6" />
							</Link>
						)}
					</div>
				</div>
				<div className="prose prose-theme max-w-none py-8 xl:col-span-2">
					{bio}
					{posts.map((post: { slug: string; title: string }, index) => (
						<Link key={index} href={`/blog/${post.slug}`}>
							<li className="list-none">{post.title}</li>
						</Link>
					))}
				</div>
			</div>
		</SectionContainer>
	)
}
