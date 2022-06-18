import Category from '@/components/Category'
import { default as Link } from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllCategories } from '@/lib/categories'
import kebabCase from '@/utils/kebabCase'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

export const getStaticProps: GetStaticProps<{ categories: Record<string, number> }> = async () => {
  const categories = await getAllCategories()

  return { props: { categories } }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Tags({ categories }: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedCategories = Object.keys(categories).sort((a, b) => categories[b] - categories[a])
  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <main className="container flex flex-col flex-1 px-3 mx-auto space-y-2 md:space-y-5 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center md:mt-24 md:space-x-6 divide-y md:divide-y-0 divide-gray-200 dark:divide-gray-700">
          <div className="pt-6 pb-8 md:space-y-5 space-x-2">
            <h1 className="md:px-6 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-9 sm:leading-10 md:leading-14 md:border-r-2">
              Categories
            </h1>
          </div>
          <div className="flex flex-wrap max-w-lg">
            {Object.keys(categories).length === 0 && 'No categories found.'}
            {sortedCategories.map((c) => {
              return (
                <div key={c} className="mt-2 mr-5 mb-2">
                  <Category text={c} />
                  <Link
                    href={`/blog/category/${kebabCase(c)}`}
                    className="-ml-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase"
                  >
                    {` (${categories[c]})`}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}
