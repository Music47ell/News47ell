import { default as Link } from '@/components/Link'
import Pagination from '@/components/blog/Pagination'
import { useSFX } from '@/hooks/useSFX'
import formatDate from '@/utils/formatDate'
import { Layout } from 'lib/interfaces'
import kebabCase from '@/utils/kebabCase'

export default function ListLayout({
  title,
  posts,
  pagination,
  initialDisplayPosts,
}: Layout): JSX.Element {
  const displayPosts = initialDisplayPosts?.length > 0 ? initialDisplayPosts : posts
  const { playMouseClick } = useSFX()

  return (
    <main className="container px-6 mx-auto max-w-3xl">
      <h1 className="mb-8 font-serif text-4xl">{title}</h1>
      {displayPosts.map((post) => (
        <Link
          key={post.id}
          href={`${post.linked ? post.linked : `/blog/${post.slug}`}`}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          onClick={playMouseClick}
        >
          <article className="text-base h-entry">
            <div className="block mb-6 rounded border border-gray-600 hover:shadow-lg hover:opacity-80 transition-all duration-150 cursor-pointer">
              <div className="relative p-4 bg-white dark:bg-gray-900 border-b border-gray-600">
                <span className="text-lg font-bold">{post.title}</span>
              </div>

              <div className="p-4 text-sm">{post.description}</div>

              <div className="p-4 bg-gray-300 dark:bg-gray-700">
                <div className="flex flex-wrap items-center space-x-2 text-sm">
                  <time
                    dateTime={post.updated_at ? post.updated_at : post.published_at}
                    className="dt-edited text-muted"
                  >
                    {formatDate(post.updated_at ? post.updated_at : post.published_at)}
                  </time>
                  <span>·</span>
                  <span>{post.category}</span>
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
