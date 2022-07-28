/* eslint-disable @typescript-eslint/no-explicit-any */
import { TwitterIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import PageTitle from '@/components/UI/PageTitle'
import { BlogSEO } from '@/components/SEO'
import Share from '@/components/blog/Share'
import Tag from '@/components/Tag'
import Category from '@/components/Category'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/utils/formatDate'
import { IPostLayout } from 'lib/interfaces'
import { useSlugStats } from '@/hooks/useStats'
import ReactionsButton from '@/components/blog/ReactionsButton'
import Markdown from '@/components/blog/Markdown'
import { getGravatar } from '@/utils/getGravatar'

export default function PostLayout({ frontMatter, next, prev, content }: IPostLayout): JSX.Element {
  const {
    slug,
    linked,
    published_at,
    updated_at,
    title,
    category,
    tags,
    wordCount,
    readingTime,
    author,
  } = frontMatter

  const { value, isLoading } = useSlugStats(encodeURIComponent(`/blog/${slug}`))

  return (
    <>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={author}
        {...frontMatter}
      />
      <main className="relative px-6 my-8 sm:mx-auto max-w-3xl">
        <div className="flex flex-col col-span-10 lg:col-span-7">
          <div className="p-4 -mx-4 rounded md:border border-nfh-accent-primary">
            <article className="h-entry">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6">
                      <Link href={slug} className="u-url">
                        <time
                          dateTime={updated_at ? updated_at : published_at}
                          itemProp="datePublished"
                          className="dt-edited"
                        >
                          {formatDate(updated_at ? updated_at : published_at)}
                        </time>
                      </Link>
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
              <div className="divide-y divide-nfh-accent-secondary">
                <dl className="py-6">
                  <dt className="sr-only">Authors</dt>
                  <dd>
                    <ul className="flex justify-center space-x-8">
                      <li
                        itemScope
                        itemProp="author"
                        itemType="http://schema.org/Person"
                        className="flex items-center space-x-2 p-name"
                        key={author.id}
                      >
                        <Image
                          src={getGravatar(author.email, 38)}
                          width="38px"
                          height="38px"
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                        <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                          <dt className="sr-only">Name</dt>
                          <dd itemProp="name" rel="author" className="p-author h-card">
                            <Link href={`/blog/author/${author.slug}`} className="">
                              {author.first_name} {author.last_name}
                            </Link>
                          </dd>
                          <dt className="sr-only">Twitter</dt>
                          <dd>
                            {author.twitter && (
                              <Link href={`https://twitter.com/${author.twitter}`} className="">
                                <TwitterIcon className="block w-6 h-6" />
                              </Link>
                            )}
                          </dd>
                        </dl>
                      </li>
                      <dl>
                        <dt className="sr-only">Post stats</dt>
                        <dd>
                          <ul className="flex xl:block justify-center xl:space-y-8 space-x-8 sm:space-x-12 xl:space-x-0">
                            <li className="flex items-center space-x-2 p-name">
                              <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                                <dt className="sr-only">Word Count</dt>
                                <dd className="p-author h-card">{wordCount} words</dd>
                                <dt className="sr-only">Reading time</dt>
                                <dd className="p-author h-card">{readingTime} minutes</dd>
                                <dt className="sr-only">Post Views</dt>
                                <dd className="p-author h-card">
                                  {isLoading ? (
                                    '---'
                                  ) : (
                                    <>
                                      {value}
                                      {value === 1 ? ' views' : ' views'}
                                    </>
                                  )}
                                </dd>
                              </dl>
                            </li>
                          </ul>
                        </dd>
                      </dl>
                    </ul>
                  </dd>
                </dl>
                <div className="xl:col-span-3 xl:row-span-2 py-6 xl:pb-0 divide-y">
                  <div itemProp="articleBody" className="max-w-none text-base e-content">
                    <Markdown>{content}</Markdown>
                  </div>
                </div>
                <ReactionsButton slug={slug} />
                <Share title={title} slug={slug} />
                <footer>
                  <div className="text-sm font-medium leading-5">
                    {tags && (
                      <div className="py-4">
                        <h2 className="text-xs tracking-wide uppercase">Tags</h2>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="py-4">
                      <h2 className="text-xs tracking-wide uppercase">Category</h2>
                      <div className="flex flex-wrap">
                        <Category key={category} text={category} />
                      </div>
                    </div>
                    {(next || prev) && (
                      <div className="flex justify-between py-4">
                        {prev && (
                          <div>
                            <h2 className="text-xs tracking-wide uppercase">Previous Article</h2>
                            <div>
                              <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                            </div>
                          </div>
                        )}
                        {next && (
                          <div>
                            <h2 className="text-xs tracking-wide uppercase">Next Article</h2>
                            <div>
                              <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="pt-4 xl:pt-8">
                    <Link href="/blog">&larr; Return to blog</Link>
                  </div>
                </footer>
              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  )
}
