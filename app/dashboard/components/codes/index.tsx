import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

import SectionHeading from '../SectionHeading'
import SectionSubHeading from '../SectionSubHeading'
import CodeStatsCard from './CodeStatsCard'
import TopLanguages from './TopLanguages'

export default function Codes() {
	return (
		<section className="flex flex-col gap-y-5">
			<div className="space-y-2 md:space-y-5">
				<SectionHeading title="Coding Stats" />
				<SectionSubHeading>
					<div className="text-neutral-400 md:flex-row md:items-center">
						<span>My all time </span>
						<Link href={`https://codestats.net/users/${siteMetadata.author.username}`}>
							CodeStats
						</Link>
						<span> stats.</span>
					</div>
					<div className="text-sm text-neutral-500">Updated every 60 seconds.</div>
				</SectionSubHeading>
				<CodeStatsCard />
			</div>
			<div className="flex flex-col space-y-4">
				<TopLanguages />
			</div>
		</section>
	)
}
