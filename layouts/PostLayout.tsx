import { ScrollTop, Share, Sponsor } from '@/components/blog'
import { PostLinks } from '@/components/blog'
import { ExternalIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import Tag from '@/components/Tag'
import { PageTitle } from '@/components/UI'
import { SectionContainer } from '@/components/UI'
import { useViewsBySlug } from '@/hooks/useViews'
import { IPostLayout } from '@/lib/interfaces'
import { displayDate, hEntryDate } from '@/utils/format-time-date'

export default function PostLayout({ content, next, prev, children }: IPostLayout) {
	const {
		filePath,
		path,
		slug,
		source,
		title,
		tags,
		published_at,
		updated_at,
		readingTime,
		wordsCount,
	} = content

	const { views, isLoading } = useViewsBySlug(slug)

	return (
		<SectionContainer className="!my-0 max-w-full !px-0">
			<ScrollTop />
			<main className="col-span-10 flex flex-col lg:col-span-7">
				<div className="fixed inset-0 bg-[url(/images/patterns/grid.svg)] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
				<article className="h-entry">
					<div className="relative z-10 flex h-screen min-h-[600px] w-full flex-col items-center justify-center">
						<div className="flex items-center justify-center gap-4">
							<time
								dateTime={hEntryDate(updated_at)}
								className="dt-published tooltip"
								aria-label={`Published at: ${displayDate(published_at)}`}
							>
								{displayDate(updated_at)}
							</time>
							<Link href={slug} className="u-url flex">
								⌘ Permalink
							</Link>
						</div>
						<div className="text-center">
							{source ? (
								<Link href={source}>
									<PageTitle>{title}</PageTitle>
									<ExternalIcon className="mt-3 inline-block h-10 w-10 fill-nfh-accent-secondary" />
								</Link>
							) : (
								<PageTitle>{title}</PageTitle>
							)}
						</div>
						<div className="absolute bottom-5 m-0 grid grid-cols-3 items-center justify-items-center gap-4 text-sm tabular-nums">
							<div className="flex items-center">
								<span className="sr-only">Reading time</span>
								<span>{readingTime} minutes</span>
							</div>
							<div className="flex items-center">
								<span className="sr-only">Views</span>
								<span>
									{isLoading ? (
										'---'
									) : (
										<>
											{views}
											{views === 1 ? ' views' : ' views'}
										</>
									)}
								</span>
							</div>
							<div className="flex items-center">
								<span className="sr-only">Words Count</span>
								<span>{wordsCount} words</span>
							</div>
						</div>
					</div>
					<div className="relative bg-nfh-background-primary">
						<div className="relative max-w-3xl divide-y divide-nfh-accent-secondary px-6 sm:mx-auto">
							<div className="e-content entry-content prose prose-theme max-w-none py-8 text-base">
								{children}
							</div>
							<PostLinks path={path} filePath={filePath} />
							<Share title={title} slug={slug} />
							<footer className="py-8">
								<div className="text-sm font-medium leading-5">
									<Sponsor />
									{tags && (
										<div className="py-4">
											<h2 className="text-xs uppercase tracking-wide">Tags</h2>
											<div className="flex flex-wrap">
												{tags.map((tag) => (
													<Tag key={tag} text={tag} />
												))}
											</div>
										</div>
									)}
									{(next || prev) && (
										<div className="flex justify-between py-4">
											{prev && (
												<div>
													<h2 className="text-xs uppercase tracking-wide">Previous Article</h2>
													<div>
														<Link
															href={`/blog/${prev.slug}`}
															aria-label={`Previous post: ${prev.title}`}
														>
															{prev.title}
														</Link>
													</div>
												</div>
											)}
											{next && (
												<div>
													<h2 className="text-xs uppercase tracking-wide">Next Article</h2>
													<div>
														<Link
															href={`/blog/${next.slug}`}
															aria-label={`Next post: ${next.title}`}
														>
															{next.title}
														</Link>
													</div>
												</div>
											)}
										</div>
									)}
								</div>
								<div className="pt-4 xl:pt-8">
									<Link href="/blog" aria-label="Back to the blog">
										cd ../blog
									</Link>
								</div>
							</footer>
						</div>
					</div>
				</article>
			</main>
		</SectionContainer>
	)
}
