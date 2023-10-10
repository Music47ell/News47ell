import { default as Image } from '@/components/Image'
import Most from '@/components/Most'
import NewsletterForm from '@/components/NewsletterForm'
import { Divider, SectionContainer } from '@/components/UI'
import type { Blog } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { getBlogHomepage } from '@/lib/contentlayer'
import { getTopPosts } from '@/lib/views'

export default async function Homepage() {
	const posts = getBlogHomepage() as Blog[]
	const topPosts = await getTopPosts()
	return (
		<SectionContainer>
			<div className="space-y-8">
				<div className="overflow-hidden rounded-xl border border-nfh-accent-primary bg-nfh-background-secondary">
					<div className="relative border-b border-nfh-accent-primary px-4 py-3">
						<div className="flex items-center gap-x-2">
							<p className="font-bold">Merhaba 👋</p>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center gap-x-8 border-b border-nfh-accent-primary p-4 max-md:space-y-4 md:flex-row md:justify-between">
						<Image
							src={siteMetadata.author.avatar}
							alt={siteMetadata.author.name}
							height={96}
							width={96}
							priority={true}
							className="col-span-1 rounded-md md:order-2"
						/>
						<div className="text-center md:text-left">
							<p>
								{`My name is ${siteMetadata.author.name}. I'm Full Stack Developer from`}
								<span className="font-bold">
									{' '}
									{siteMetadata.author.location.country +
										' ' +
										siteMetadata.author.location.emojiFlag}
								</span>
							</p>
							<p>
								This site is where I conduct all my experiments, and share my thoughts and ideas.
							</p>
						</div>
					</div>
				</div>
				<NewsletterForm />
				<Most title="Most Recent Blog Posts" posts={posts} />
				<Most title="Most Viewed Blog Posts" posts={topPosts} />
			</div>
		</SectionContainer>
	)
}
