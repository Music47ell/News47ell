/* eslint-disable @typescript-eslint/no-explicit-any */
import { TwitterIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { PageTitle } from '@/components/UI'
import { BlogSEO } from '@/components/SEO'
import { Donate, Share, ReactionsButton, Markdown } from '@/components/blog'
import Tag from '@/components/Tag'
import Category from '@/components/Category'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/utils/formatDate'
import { IPostLayout } from 'lib/interfaces'
import { useSlugStats } from '@/hooks/useStats'
import { getGravatar } from '@/utils/getGravatar'
import FeaturedArt from '@/components/blog/FeaturedArt'

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
      <main className="relative my-8 max-w-3xl px-6 sm:mx-auto">
        <div className="col-span-10 flex flex-col lg:col-span-7">
          <div className="-mx-4 rounded border-nfh-accent-primary p-4 md:border">
            <article className="h-entry space-y-1">
              <FeaturedArt text={title} />
              <div className="text-center">
                <dl className="space-y-10">
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
                        className="p-name flex items-center space-x-2"
                        key={author.id}
                      >
                        <Image
                          src={getGravatar(author.email, 38)}
                          width="38px"
                          height="38px"
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
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
                                <TwitterIcon className="block h-6 w-6" />
                              </Link>
                            )}
                          </dd>
                        </dl>
                      </li>
                      <dl>
                        <dt className="sr-only">Post stats</dt>
                        <dd>
                          <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                            <li className="p-name flex items-center space-x-2">
                              <dl className="whitespace-nowrap text-sm font-medium leading-5">
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
                <div className="divide-y py-6 xl:col-span-3 xl:row-span-2 xl:pb-0">
                  <div itemProp="articleBody" className="e-content max-w-none text-base">
                    <Markdown>{content}</Markdown>
                  </div>
                </div>
                <ReactionsButton slug={slug} />
                <Share title={title} slug={slug} />
                <footer>
                  <div className="text-sm font-medium leading-5">
                    <Donate />
                    {tags && (
                      <div className="py-4">
                        <h2 className="text-xs uppercase tracking-wide">Tags</h2>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="py-4">
                      <h2 className="text-xs uppercase tracking-wide">Category</h2>
                      <div className="flex flex-wrap">
                        <Category key={category} text={category} />
                      </div>
                    </div>
                    {(next || prev) && (
                      <div className="flex justify-between py-4">
                        {prev && (
                          <div>
                            <h2 className="text-xs uppercase tracking-wide">Previous Article</h2>
                            <div>
                              <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                            </div>
                          </div>
                        )}
                        {next && (
                          <div>
                            <h2 className="text-xs uppercase tracking-wide">Next Article</h2>
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
