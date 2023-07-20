import { getStats } from '@/lib/trakt'
import { displayNumbers } from '@/utils/formatters'

import OverviewItem from '../../components/OverviewItem'

const getTraktStats = async () => {
	const data = await getStats()

	return data
}

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const TraktCard = asyncComponent(async () => {
	const stats = await getTraktStats()

	return (
		<div className="mb-1 grid gap-3 py-2 md:grid-cols-2">
			<OverviewItem
				label="Total Days"
				value={displayNumbers.format((stats.episodes.minutes + stats.movies.minutes) / 60 / 24)}
			/>
			<OverviewItem label="Shows" value={stats.shows.watched} />
			<OverviewItem label="Movies" value={stats.movies.watched} />
			<OverviewItem
				label="Days spent on shows"
				value={displayNumbers.format(stats.episodes.minutes / 60 / 24)}
			/>
			<OverviewItem
				label="Days spent on movies"
				value={displayNumbers.format(stats.movies.minutes / 60 / 24)}
			/>
			<OverviewItem
				label="Episodes watched"
				value={displayNumbers.format(stats.episodes.watched)}
			/>
		</div>
	)
})

export default TraktCard
