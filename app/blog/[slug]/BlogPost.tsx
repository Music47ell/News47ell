import type { Route } from 'next'

import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import NewsletterForm from '@/components/NewsletterForm'
import { PageTitle } from '@/components/UI'
import { SectionContainer } from '@/components/UI'
import ViewsCounter from '@/components/ViewsCounter'
import { displayDate, hEntryDate } from '@/utils/formatters'

const BlogPost = ({
	source,
	title,
	publishedAt,
	updatedAt,
	readingTime,
	wordsCount,
	cover,
	slug,
	post,
	structuredData,
}) => {
	return (
		<SectionContainer>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<main className="col-span-10 flex flex-col lg:col-span-7">
				<article className="h-entry">
					<div className="relative flex w-full flex-col items-center justify-center gap-4">
						{post.cover && (
							<Image
								src={cover.filePath.replace('../public', '')}
								alt={cover.fileName}
								sizes="100vw"
								className="h-auto w-full"
								width={500}
								height={300}
								blurDataURL={post.cover.blurhashDataUrl}
							/>
						)}
						<div className="flex items-center justify-center gap-4">
							<time
								dateTime={hEntryDate(updatedAt)}
								className="dt-published"
								aria-label={`Published at: ${displayDate(publishedAt)}`}
							>
								{displayDate(updatedAt)}
							</time>
							<Link href={slug as Route} className="u-url flex">
								⌘ Permalink
							</Link>
						</div>
						<div className="text-center">
							{source ? (
								<Link href={source as Route}>
									<PageTitle>{title} &#8599;</PageTitle>
								</Link>
							) : (
								<PageTitle>{title}</PageTitle>
							)}
						</div>
						<div className="grid grid-cols-3 items-center justify-items-center gap-4 text-sm tabular-nums">
							<div className="flex items-center">
								<span className="sr-only">Reading time</span>
								<span>{readingTime} minutes</span>
							</div>
							<div className="flex items-center">
								<span className="sr-only">Words Count</span>
								<span>{wordsCount} words</span>
							</div>
							<div className="flex items-center">
								<span className="sr-only">Views</span>
								<ViewsCounter slug={slug} trackView={true} />
							</div>
						</div>
					</div>
					<div className="relative bg-nfh-background-primary py-6">
						<div className="relative max-w-3xl divide-y divide-nfh-accent-secondary sm:mx-auto">
							<div className="e-content entry-content prose prose-theme max-w-none text-base">
								<MDXLayoutRenderer content={post} toc={post?.toc} />
							</div>
						</div>
					</div>
				</article>
				<NewsletterForm />
			</main>
		</SectionContainer>
	)
}

export default BlogPost
