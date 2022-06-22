import { default as Link } from '@/components/Link'
import { useSFX } from '@/hooks/useSFX'
import formatDate from '@/utils/formatDate'
import { Layout } from 'lib/interfaces'

export default function ArchiveLayout({ posts }: Layout): JSX.Element {
  const { playMouseClick } = useSFX()

  return (
    <main className="container flex flex-col flex-1 px-3 mx-auto space-y-2 md:space-y-5 max-w-5xl">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {posts.map((frontMatter) => {
          const { slug, linked, published_at, updated_at, title, description } = frontMatter
          return (
            <li key={slug} className="py-12">
              <article className="h-entry">
                <div className="space-y-2">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time
                        dateTime={updated_at ? updated_at : published_at}
                        className="dt-edited text-muted"
                      >
                        {formatDate(updated_at ? updated_at : published_at)}
                      </time>
                    </dd>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400"></dd>
                  </dl>
                  <div className="xl:col-span-3 space-y-5">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold tracking-tight leading-8">
                          <Link
                            href={!linked ? `/blog/${slug}` : linked}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            onClick={playMouseClick}
                          >
                            {title}
                          </Link>
                        </h2>
                      </div>
                      <div className="max-w-none p-summary text-muted">{description}</div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                        aria-label={`Read "${title}"`}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        onClick={playMouseClick}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
