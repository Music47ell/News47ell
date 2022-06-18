import Comments from '@/components/comments'
import { default as Link } from '@/components/Link'
import PageTitle from '@/components/UI/PageTitle'
import { BlogSEO } from '@/components/SEO'
import Share from '@/components/blog/Share'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/utils/formatDate'
import { IPostSimple } from 'lib/interfaces'
import ReactionsButton from '@/components/blog/ReactionsButton'
import Markdown from '@/components/blog/Markdown'

export default function PostSimple({ frontMatter, next, prev, content }: IPostSimple): JSX.Element {
  const { updated_at, title, slug, linked } = frontMatter

  return (
    <>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${slug}`} {...frontMatter} />
      <main className="container flex flex-col flex-1 px-3 mx-auto max-w-5xl">
        <div className="p-4 -mx-4 rounded md:border border-gray-600">
          <article className="h-entry">
            <header>
              <div className="pb-10 space-y-1 text-center border-b border-gray-200 dark:border-gray-700">
                <dl>
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={updated_at} className="text-muted">
                        {formatDate(updated_at)}
                      </time>
                    </dd>
                  </div>
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
            </header>
            <div
              className="divide-y xl:divide-y-0 divide-gray-200 dark:divide-gray-700"
              style={{ gridTemplateRows: 'auto 1fr' }}
            >
              <div className="xl:col-span-3 xl:row-span-2 xl:pb-0 divide-y divide-gray-200 dark:divide-gray-700">
                <div className="pt-10 pb-8 max-w-none prose prose-theme">
                  <Markdown>{content}</Markdown>
                </div>
              </div>
              <ReactionsButton slug={slug} />
              <Share title={title} slug={slug} />
              <Comments frontMatter={frontMatter} />
              <footer>
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm sm:text-base font-medium">
                  {prev && (
                    <div className="pt-4 xl:pt-8">
                      <Link href={`/blog/${prev.slug}`}>&larr; {prev.title}</Link>
                    </div>
                  )}
                  {next && (
                    <div className="pt-4 xl:pt-8">
                      <Link href={`/blog/${next.slug}`}>{next.title} &rarr;</Link>
                    </div>
                  )}
                </div>
              </footer>
            </div>
          </article>
        </div>
      </main>
    </>
  )
}
