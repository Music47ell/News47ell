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
  const { author, published_at, updated_at, title, slug, linked } = frontMatter

  return (
    <>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={author}
        {...frontMatter}
      />
      <main className="container mx-auto flex max-w-5xl flex-1 flex-col px-3">
        <div className="-mx-4 rounded border-gray-600 p-4 md:border">
          <article className="h-entry">
            <header>
              <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
                <dl>
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time
                        dateTime={updated_at ? updated_at : published_at}
                        className="text-nfh-text-secondary"
                      >
                        {formatDate(updated_at ? updated_at : published_at)}
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
              className="divide-y divide-gray-200 dark:divide-gray-700 xl:divide-y-0"
              style={{ gridTemplateRows: 'auto 1fr' }}
            >
              <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                <Markdown>{content}</Markdown>
              </div>
              <ReactionsButton slug={slug} />
              <Share title={title} slug={slug} />
              <footer>
                <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
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
