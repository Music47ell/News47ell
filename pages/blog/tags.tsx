import { default as Link } from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/utils/kebabCase'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import SectionContainer from '@/components/UI/SectionContainer'

export const getStaticProps: GetStaticProps<{ tags: Record<string, number> }> = async () => {
  const tags = await getAllTags()

  return { props: { tags } }
}

export default function Tags({ tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <SectionContainer>
        <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center my-8 md:space-x-6 divide-y md:divide-y-0 divide-gray-200 dark:divide-gray-700">
          <div className="pt-6 pb-8 md:space-y-5 space-x-2">
            <h1 className="md:px-6 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-9 sm:leading-10 md:leading-14 md:border-r-2">
              Tags
            </h1>
          </div>
          <div className="flex flex-wrap max-w-lg">
            {Object.keys(tags).length === 0 && 'No tags found.'}
            {sortedTags.map((t) => {
              return (
                <div key={t} className="mt-2 mr-5 mb-2">
                  <Tag text={t} />
                  <Link
                    href={`/blog/tag/${kebabCase(t)}`}
                    className="-ml-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase"
                  >
                    {` (${tags[t]})`}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
