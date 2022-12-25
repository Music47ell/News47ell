/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPostLayout } from 'lib/interfaces'
import { useEffect, useState } from 'react'

import { ReactionsButton, ScrollTop, Share, Sponsor } from '@/components/blog'
import { AuthorsDetails, PostDate, PostLinks } from '@/components/blog'
import FeaturedArt from '@/components/blog/FeaturedArt'
import { Slash } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { BlogSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import { Divider } from '@/components/UI'
import { PageTitle } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'
import { useCommitData } from '@/hooks/useGitHub'
import { useViewsBySlug } from '@/hooks/useViews'

export default function PostLayout({ content, authorDetails, next, prev, children }: IPostLayout) {
	const [publishedAt, setPublishedAt] = useState('')
	const [updatedAt, setUpdatedAt] = useState('')
	const { filePath, path, slug, source, title, tags, stats, published_at } = content
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
			<BlogSEO
				url={`${siteMetadata.siteUrl}/blog/${slug}`}
				authorDetails={authorDetails}
				{...content}
			/>
			<main className="relative my-8 max-w-3xl px-6 sm:mx-auto">
				<div className="col-span-10 flex flex-col lg:col-span-7">
					<div className="-mx-4 rounded border-nfh-accent-primary p-4 md:border">
						<article className="h-entry space-y-12">
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
							<Divider>
								<Slash className="block h-10 w-auto" />
							</Divider>
							<div className="grid grid-cols-3 items-center justify-items-center gap-4 text-sm tabular-nums">
								<div className="flex items-center space-x-2">
									<span className="sr-only">Reading time</span>
									<span>{stats.timeToRead} minutes</span>
								</div>
								<div className="flex items-center space-x-2">
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
								<div className="flex items-center space-x-2">
									<span className="sr-only">Words Count</span>
									<span>{stats.wordsCount} words</span>
								</div>
							</div>
							<div className="divide-y divide-nfh-accent-secondary">
								<div className="divide-y py-6">
									<div className="e-content entry-content prose prose-theme max-w-none text-base">
										{children}
									</div>
								</div>
								<div
									className={
										authorDetails.length === 1
											? 'grid grid-cols-1 gap-4 py-4'
											: 'grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3'
									}
								>
									{authorDetails.map((author, index) => (
										<AuthorsDetails key={author.id} ranking={index + 1} {...author} />
									))}
								</div>
								<PostLinks path={path} filePath={filePath} />
								<ReactionsButton slug={slug} />
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
											&larr; Back to the blog
										</Link>
									</div>
								</footer>
							</div>
						</article>
					</div>
				</div>
			</main>
		</>
	)
}
