/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPostLayout } from 'lib/interfaces'

import { Markdown, ReactionsButton, ScrollTop, Share, Sponsor } from '@/components/blog'
import FeaturedArt from '@/components/blog/FeaturedArt'
import Category from '@/components/Category'
import { TwitterIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { BlogSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import { PageTitle } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'
import { useViewsBySlug } from '@/hooks/useViews'
import { displayDate, hEntryDate } from '@/utils/format-date'
import { getGravatar } from '@/utils/get-gravatar'

export default function PostLayout({ frontMatter, next, prev, content }: IPostLayout): JSX.Element {
	const { slug, linked, published_at, updated_at, title, category, tags, readingTime, author } =
		frontMatter

	const { views, isLoading } = useViewsBySlug(slug)

	return (
		<>
			<ScrollTop />
			<BlogSEO
				url={`${siteMetadata.siteUrl}/blog/${slug}`}
				authorDetails={author}
				{...frontMatter}
			/>
			<main className="relative my-8 max-w-3xl px-6 sm:mx-auto">
				<div className="col-span-10 flex flex-col lg:col-span-7">
					<div className="-mx-4 rounded border-nfh-accent-primary p-4 md:border">
						<article className="h-entry space-y-1">
							<FeaturedArt text={title} />
							<div className="text-center">
								<dl className="space-y-10">
									<dt className="sr-only">Published on</dt>
									<dd className="text-base font-medium leading-6">
										<Link href={slug} className="u-url">
											<time
												dateTime={hEntryDate(updated_at ? updated_at : published_at)}
												className="dt-published"
											>
												{displayDate(updated_at ? updated_at : published_at)}
											</time>
										</Link>
									</dd>
								</dl>
								<div>
									{linked ? (
										<Link href={linked}>
											<PageTitle>{title}</PageTitle>
										</Link>
									) : (
										<PageTitle>{title}</PageTitle>
									)}
								</div>
							</div>
							<div className="divide-y divide-nfh-accent-secondary">
								<dl className="py-6">
									<dt className="sr-only">Authors</dt>
									<dd>
										<ul className="flex justify-center space-x-8">
											<li className="flex items-center space-x-2" key={author.id}>
												<Link
													href={`/blog/author/${author.slug}`}
													className="p-author h-card"
													rel="author"
												>
													<div className="flex place-content-center [&>img]:rounded-full">
														<Image
															src={getGravatar(author.email, 38)}
															alt={author.first_name + ' ' + author.last_name}
															className="photo u-photo"
															width={40}
															height={40}
														/>
													</div>
													<span>{author.first_name + ' ' + author.last_name}</span>
												</Link>
											</li>
											<dl>
												<dt className="sr-only">Post stats</dt>
												<dd>
													<ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
														<li className="flex items-center space-x-2">
															<dl className="whitespace-nowrap text-sm font-medium leading-5">
																<dt className="sr-only">Word Count</dt>
																<dd>{readingTime.words} words</dd>
																<dt className="sr-only">Reading time</dt>
																<dd>{readingTime.time} minutes</dd>
																<dt className="sr-only">Post Views</dt>
																<dd>
																	{isLoading ? (
																		'---'
																	) : (
																		<>
																			{views}
																			{views === 1 ? ' views' : ' views'}
																		</>
																	)}
																</dd>
															</dl>
														</li>
													</ul>
												</dd>
											</dl>
										</ul>
									</dd>
								</dl>
								<div className="divide-y py-6">
									<div className="e-content entry-content max-w-none text-base">
										<Markdown>{content}</Markdown>
									</div>
								</div>
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
										<div className="py-4">
											<h2 className="text-xs uppercase tracking-wide">Category</h2>
											<div className="flex flex-wrap">
												<Category key={category} text={category} />
											</div>
										</div>
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
