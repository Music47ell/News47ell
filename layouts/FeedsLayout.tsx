import { RSSIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'
import { PageTitle } from '@/components/UI'
import { allTags } from '@/lib/contentlayer'
import kebabCase from '@/utils/kebab-case'

export default function FeedsLayout() {
	const tags = allTags()
	const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])

	return (
		<SectionContainer className="!max-w-3xl">
			<div className="text-center">
				<PageTitle>Feeds</PageTitle>
			</div>
			<p className="text-center text-base text-nfh-text-secondary">
				This is a complete list of all the RSS feeds that are available on this site that you can
				subscribe to.
			</p>
			<p className="text-center text-sm text-nfh-text-secondary">
				The feeds are offered in two formats: RSS and JSON.
			</p>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-2 rounded-lg bg-nfh-background-secondary p-3 shadow md:flex-row md:items-center md:justify-between md:gap-4">
					<div className="flex items-center justify-between gap-3">
						<div className="relative flex items-center justify-center">
							{RSSIcon({ className: 'w-10 h-10' })}
						</div>
						<p className="text-lg">Main Feed: </p>
						<Link
							href={`/blog/feed.xml`}
							className="text-sm font-semibold hover:underline sm:text-base"
						>
							RSS
						</Link>
						<Link
							href={`/blog/feed.json`}
							className="text-sm font-semibold hover:underline sm:text-base"
						>
							JSON
						</Link>
					</div>
				</div>
				{sortedTags.map((tag) => {
					return (
						<div
							className="flex flex-col gap-2 rounded-lg bg-nfh-background-secondary p-3 shadow md:flex-row md:items-center md:justify-between md:gap-4"
							key={tag}
						>
							<div className="flex items-center justify-between gap-3">
								<div className="relative flex items-center justify-center">
									{RSSIcon({ className: 'w-10 h-10' })}
								</div>
								<p className="text-lg">{tag}: </p>
								<Link
									href={`/blog/tag/${kebabCase(tag)}/feed.xml`}
									className="text-sm font-semibold hover:underline sm:text-base"
								>
									RSS
								</Link>
								<Link
									href={`/blog/tag/${kebabCase(tag)}/feed.json`}
									className="text-sm font-semibold hover:underline sm:text-base"
								>
									JSON
								</Link>
							</div>
						</div>
					)
				})}
			</div>
		</SectionContainer>
	)
}
