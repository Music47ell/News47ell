import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

import SectionHeading from '../SectionHeading'
import SectionSubHeading from '../SectionSubHeading'
import MoviesWatched from './MoviesWatched'
import ShowsWatched from './ShowsWatched'
import TraktCard from './TraktCard'

export default function Shows() {
	return (
		<>
			<div className="space-y-2 md:space-y-5">
				<SectionHeading title="Movies & Shows Stats" />
				<SectionSubHeading>
					<div className="text-neutral-400 md:flex-row md:items-center">
						<span>My all time </span>
						<Link href={`https://trakt.tv/users/${siteMetadata.author.username}`}>Trakt.tv</Link>
						<span> stats.</span>
					</div>
					<div className="text-sm text-neutral-500">Updated every 60 seconds.</div>
				</SectionSubHeading>
				<TraktCard />
			</div>
			<h3 className="text-2xl font-bold leading-8 tracking-tight">
				Most Recent Movies I've Watched
			</h3>
			<MoviesWatched />
			<h3 className="text-2xl font-bold leading-8 tracking-tight">
				Most Recent TV Shows I've Watched
			</h3>
			<ShowsWatched />
		</>
	)
}
