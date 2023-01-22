import { default as Link } from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

const NotFound = (): JSX.Element => (
	<>
		<PageSEO
			title={`Page Not Found - ${siteMetadata.title}`}
			description={siteMetadata.description}
		/>
		<div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
			<div className="space-x-2 pt-6 pb-8 md:space-y-5">
				<h1 className="text-6xl font-extrabold leading-9 tracking-tight md:border-r-2 md:px-6 md:text-8xl">
					404
				</h1>
			</div>
			<div className="max-w-md">
				<p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
					Sorry we couldn't find this page.
				</p>
				<p className="mb-8">
					But don't worry, you can find plenty of other things on our homepage.
				</p>
				<Link href="/">
					<button className="inline rounded-lg border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none">
						Back to homepage
					</button>
				</Link>
			</div>
		</div>
	</>
)

export default NotFound
