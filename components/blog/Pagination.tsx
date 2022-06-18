import { default as Link } from '@/components/Link'
import { useSFX } from '@/hooks/useSFX'
import { IPagination } from 'lib/interfaces'

export default function Pagination({ totalPages, currentPage }: IPagination): JSX.Element {
  const { playPageTurn } = useSFX()

  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="pt-5 pb-5 space-y-2 md:space-y-5 border-t border-b border-gray-200 dark:border-gray-700">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            rel="previous"
            className="disabled:opacity-50 cursor-not-allowed"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onClick={playPageTurn}
          >
            <button rel="previous">Previous</button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            rel="next"
            className="disabled:opacity-50 cursor-not-allowed"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          <Link href={`/blog/page/${currentPage + 1}`} onClick={playPageTurn}>
            <button rel="next">Next</button>
          </Link>
        )}
      </nav>
    </div>
  )
}
