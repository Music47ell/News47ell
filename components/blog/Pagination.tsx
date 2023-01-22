import { default as Link } from '@/components/Link'
import { IPagination } from '@/lib/interfaces'

export default function Pagination({ totalPages, currentPage }: IPagination): JSX.Element {
	const prevPage = currentPage - 1 > 0
	const nextPage = currentPage + 1 <= totalPages

	return (
		<div className="space-y-2 border-y border-nfh-accent-primary py-5 md:space-y-5">
			<nav className="flex justify-between">
				{!prevPage && (
					<button
						rel="previous"
						className="cursor-not-allowed disabled:opacity-50"
						disabled={!prevPage}
					>
						Previous
					</button>
				)}
				{prevPage && (
					<Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
						<button rel="previous">Previous</button>
					</Link>
				)}
				<span>
					{currentPage} of {totalPages}
				</span>
				{!nextPage && (
					<button
						rel="next"
						className="cursor-not-allowed disabled:opacity-50"
						disabled={!nextPage}
					>
						Next
					</button>
				)}
				{nextPage && (
					<Link href={`/blog/page/${currentPage + 1}`}>
						<button rel="next">Next</button>
					</Link>
				)}
			</nav>
		</div>
	)
}
