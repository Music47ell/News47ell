import { usePathname } from 'next/navigation'

import Pagination from '@/components/blog/Pagination'
import { JSONIcon, RSSIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { BorderEffect, SectionContainer } from '@/components/UI'
import { Layout } from '@/lib/interfaces'
import { displayDate, hEntryDate } from '@/utils/format-date'

export default function ListLayout({ title, posts, pagination, initialDisplayPosts }: Layout) {
	const pathname = usePathname()
	const displayPosts = initialDisplayPosts?.length > 0 ? initialDisplayPosts : posts

	return (
		<SectionContainer className="h-feed !max-w-3xl !px-6">
			<h1 className="font-serif text-4xl">{title}</h1>
			<div className="flex items-center justify-between">
				<Link href={`${pathname}/feed.xml`}>
					<RSSIcon className="inline-block h-7 w-7" />
				</Link>
				<Link href={`${pathname}/feed.json`}>
					<JSONIcon className="inline-block h-7 w-7" />
				</Link>
			</div>
			{displayPosts.map((post) => (
				<Link key={post.slug} href={`${post.source ? post.source : `/blog/${post.slug}`}`}>
					<article className="h-entry hentry text-base">
						<div className="group relative mb-6 block cursor-pointer items-center bg-nfh-background-secondary p-2 text-nfh-text-primary transition duration-500 hover:scale-105 hover:opacity-80 hover:shadow-lg">
							<BorderEffect />
							<div className="relative p-4">
								<span className="text-lg font-bold text-nfh-accent-primary">{post.title}</span>
							</div>

							<div className="border-y border-nfh-accent-secondary p-4 text-sm">
								{post.description}
							</div>

							<div className="p-4 text-nfh-accent-primary">
								<div className="grid grid-cols-3 items-center justify-items-center gap-4 text-sm">
									<time
										dateTime={hEntryDate(post.published_at)}
										className="dt-edited flex items-center space-x-2"
									>
										{displayDate(post.published_at)}
									</time>
									<span className="flex items-center space-x-2">{post.readingTime} minutes</span>
									<span className="flex items-center space-x-2">{post.wordsCount} words</span>
								</div>
							</div>
						</div>
					</article>
				</Link>
			))}
			{pagination && pagination.totalPages > 1 && (
				<Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
			)}
		</SectionContainer>
	)
}
