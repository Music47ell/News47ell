import { Layout } from 'lib/interfaces'

import Pagination from '@/components/blog/Pagination'
import { default as Link } from '@/components/Link'
import { BorderEffect } from '@/components/UI'
import { useSFX } from '@/hooks/useSFX'
import formatDate from '@/utils/format-date'

export default function ListLayout({
	title,
	posts,
	pagination,
	initialDisplayPosts,
}: Layout): JSX.Element {
	const displayPosts = initialDisplayPosts?.length > 0 ? initialDisplayPosts : posts
	const { playMouseClick } = useSFX()

	return (
		<main className="container my-8 mx-auto max-w-3xl px-6">
			<h1 className="mb-8 font-serif text-4xl">{title}</h1>
			{displayPosts.map((post) => (
				<Link
					key={post.id}
					href={`${post.linked ? post.linked : `/blog/${post.slug}`}`}
					//@ts-ignore
					onClick={playMouseClick}
				>
					<article className="h-entry text-base">
						<div className="group relative mb-6 block cursor-pointer items-center bg-nfh-background-secondary p-2 text-nfh-text-primary transition duration-500 hover:scale-105 hover:opacity-80 hover:shadow-lg">
							<BorderEffect />
							<div className="relative p-4">
								<span className="text-lg font-bold text-nfh-accent-primary">{post.title}</span>
							</div>

							<div className="border-y border-nfh-accent-secondary p-4 text-sm">
								{post.description}
							</div>

							<div className="p-4 text-nfh-accent-primary">
								<div className="grid grid-cols-2 items-center justify-items-center gap-4 text-sm sm:grid-cols-4">
									<time
										dateTime={post.updated_at ? post.updated_at : post.published_at}
										className="dt-edited flex items-center space-x-2"
									>
										{formatDate(post.updated_at ? post.updated_at : post.published_at)}
									</time>
									<span className="flex items-center space-x-2">{post.category}</span>
									<span className="flex items-center space-x-2">
										{post.readingTime.time} minutes
									</span>
									<span className="flex items-center space-x-2">
										{post.readingTime.words} words
									</span>
								</div>
							</div>
						</div>
					</article>
				</Link>
			))}
			{pagination && pagination.totalPages > 1 && (
				<Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
			)}
		</main>
	)
}
