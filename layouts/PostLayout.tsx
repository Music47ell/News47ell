/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

import { ScrollTop, Share, Sponsor } from '@/components/blog'
import { AuthorDetails, PostDate, PostLinks } from '@/components/blog'
import FeaturedArt from '@/components/blog/FeaturedArt'
import { Slash } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import Tag from '@/components/Tag'
import { Divider } from '@/components/UI'
import { PageTitle } from '@/components/UI'
import { useCommitData } from '@/hooks/useGitHub'
import { useViewsBySlug } from '@/hooks/useViews'
import { IPostLayout } from '@/lib/interfaces'

export default function PostLayout({ content, next, prev, children }: IPostLayout) {
	const [publishedAt, setPublishedAt] = useState('')
	const [updatedAt, setUpdatedAt] = useState('')
	const { filePath, path, slug, source, title, tags, published_at, readingTime, wordsCount } =
		content
	const { firstCommitDate, lastCommitDate, firstCommitHash, lastCommitHash, isCommitDataLoading } =
		useCommitData(encodeURIComponent(filePath))

	useEffect(() => {
		if (firstCommitDate && lastCommitDate) {
			setPublishedAt(firstCommitDate)
			setUpdatedAt(lastCommitDate)
		} else {
			setPublishedAt(published_at)
			setUpdatedAt(published_at)
		}
	}, [firstCommitDate, lastCommitDate, published_at])

	const { views, isLoading } = useViewsBySlug(slug)

	return (
		<>
			<ScrollTop />
			<main className="col-span-10 flex flex-col lg:col-span-7">
				<div className="fixed inset-0 bg-[url(/images/patterns/grid.svg)] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
				<article className="h-entry">
					<div className="relative z-10 flex h-screen min-h-[600px] w-full flex-col items-center justify-center">
						<FeaturedArt text={title} />
						<PostDate
							published_at={publishedAt}
							updated_at={updatedAt}
							firstCommitHash={firstCommitHash}
							lastCommitHash={lastCommitHash}
							slug={slug}
							isCommitDataLoading={isCommitDataLoading}
						/>
						<div className="text-center">
							{source ? (
								<Link href={source}>
									<PageTitle>{title}</PageTitle>
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
						<div className="relative max-w-3xl divide-y divide-nfh-accent-secondary py-8 px-6 sm:mx-auto">
							<div className="e-content entry-content prose prose-theme max-w-none text-base">
								{children}
							</div>
							<div className="grid grid-cols-1 gap-4 py-4">
								<AuthorDetails />
							</div>
							<PostLinks path={path} filePath={filePath} />
							<Share title={title} slug={slug} />
							<footer>
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
		</>
	)
}
