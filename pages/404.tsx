import { default as Link } from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

const NotFound = (): JSX.Element => (
  <>
    <PageSEO
      title={`Page Not Found - ${siteMetadata.title}`}
      description={siteMetadata.description}
    />
    <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center md:mt-24 md:space-x-6">
      <div className="pt-6 pb-8 md:space-y-5 space-x-2">
        <h1 className="md:px-6 text-6xl md:text-8xl font-extrabold tracking-tight leading-9 md:leading-14 md:border-r-2">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl md:text-2xl font-bold leading-normal">
          Sorry we couldn't find this page.
        </p>
        <p className="mb-8">
          But don't worry, you can find plenty of other things on our homepage.
        </p>
        <Link href="/">
          <button className="inline py-2 px-4 text-sm font-medium leading-5 text-white bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 rounded-lg border border-transparent shadow transition-colors duration-150 focus:outline-none">
            Back to homepage
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default NotFound
