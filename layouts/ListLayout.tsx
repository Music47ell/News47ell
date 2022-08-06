import { default as Link } from '@/components/Link'
import Pagination from '@/components/blog/Pagination'
import { useSFX } from '@/hooks/useSFX'
import formatDate from '@/utils/formatDate'
import { Layout } from 'lib/interfaces'

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
            <div className="mb-6 block cursor-pointer rounded border border-nfh-accent-primary bg-nfh-background-secondary text-nfh-text-primary transition-all duration-150 hover:opacity-80 hover:shadow-lg">
              <div className="relative p-4">
                <span className="text-lg font-bold text-nfh-accent-primary">{post.title}</span>
              </div>

              <div className="border-y border-nfh-accent-secondary p-4 text-sm">
                {post.description}
              </div>

              <div className="p-4 text-nfh-accent-primary">
                <div className="flex flex-wrap items-center space-x-2 text-sm">
                  <time
                    dateTime={post.updated_at ? post.updated_at : post.published_at}
                    className="dt-edited"
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
