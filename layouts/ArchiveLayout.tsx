import { default as Link } from '@/components/Link'
import { useSFX } from '@/hooks/useSFX'
import formatDate from '@/utils/formatDate'
import { Layout } from 'lib/interfaces'
import SectionContainer from '@/components/UI/SectionContainer'

export default function ArchiveLayout({ posts }: Layout): JSX.Element {
  const { playMouseClick } = useSFX()

  return (
    <SectionContainer>
      <ul className="divide-y divide-nfh-accent-primary">
        {posts.map((frontMatter) => {
          const { slug, linked, published_at, updated_at, title, description } = frontMatter
          return (
            <li key={slug} className="py-12">
              <article className="h-entry">
                <div className="space-y-2">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-nfh-text-primary">
                      <time
                        dateTime={updated_at ? updated_at : published_at}
                        className="dt-edited text-nfh-text-primary"
                      >
                        {formatDate(updated_at ? updated_at : published_at)}
                      </time>
                    </dd>
                    <dd className="text-base font-medium leading-6 text-nfh-text-primary"></dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            href={!linked ? `/blog/${slug}` : linked}
                            //@ts-ignore
                            onClick={playMouseClick}
                          >
                            {title}
                          </Link>
                        </h2>
                      </div>
                      <div className="p-summary max-w-none text-nfh-text-primary">
                        {description}
                      </div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-nfh-text-secondary hover:text-nfh-text-primary"
                        aria-label={`Read "${title}"`}
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
    </SectionContainer>
  )
}
