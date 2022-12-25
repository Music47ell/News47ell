import { IPageLayout } from 'lib/interfaces'

import { PageSEO } from '@/components/SEO'
import { PageTitle } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'

export default function PageLayout({ content, children }: IPageLayout) {
	const { title } = content

	return (
		<>
			<PageSEO title={`${title} - ${siteMetadata.title}`} description={siteMetadata.description} />
			<main className="mx-auto flex max-w-5xl flex-1 flex-col px-3">
				<article className="pt-4">
					<div>
						<header>
							<div className="space-y-1 border-b border-gray-200 py-5 text-center dark:border-gray-700">
								<div>
									<PageTitle>{title}</PageTitle>
								</div>
							</div>
						</header>
						<div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0">
							<div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
								<div className="prose prose-theme max-w-none pt-10 pb-8">{children}</div>
							</div>
							<footer></footer>
						</div>
					</div>
				</article>
			</main>
		</>
	)
}
