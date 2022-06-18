import PageTitle from '@/components/UI/PageTitle'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { IPostLayout } from 'lib/interfaces'
import Markdown from '@/components/blog/Markdown'

export default function PageLayout({ frontMatter, content }: IPostLayout): JSX.Element {
  const { title } = frontMatter

  return (
    <>
      <PageSEO title={`${title} - ${siteMetadata.title}`} description={siteMetadata.description} />
      <main className="flex flex-col flex-1 px-3 mx-auto max-w-5xl">
        <article className="pt-4">
          <div>
            <header>
              <div className="py-5 space-y-1 text-center border-b border-gray-200 dark:border-gray-700">
                <div>
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
            </header>
            <div
              className="pb-8 divide-y xl:divide-y-0 divide-gray-200"
              style={{ gridTemplateRows: 'auto 1fr' }}
            >
              <div className="xl:col-span-3 xl:row-span-2 xl:pb-0 divide-y divide-gray-200 dark:divide-gray-700">
                <div className="pt-10 pb-8 max-w-none prose prose-theme">
                  <Markdown>{content}</Markdown>
                </div>
              </div>
              <footer></footer>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
