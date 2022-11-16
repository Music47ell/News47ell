import { default as Link } from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/utils/kebabCase'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { SectionContainer } from '@/components/UI'

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
				<div className="my-8 flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
					<div className="space-x-2 pt-6 pb-8 md:space-y-5">
						<h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
							Tags
						</h1>
					</div>
					<div className="flex max-w-lg flex-wrap">
						{Object.keys(tags).length === 0 && 'No tags found.'}
						{sortedTags.map((t) => {
							return (
								<div key={t} className="my-2 mr-5">
									<Tag text={t} />
									<Link
										href={`/blog/tag/${kebabCase(t)}`}
										className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
										aria-label={`View posts tagged "${t}"`}
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
