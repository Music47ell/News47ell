import { default as Link } from '@/components/Link'
import { getStats } from '@/lib/trakt'

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
				value={((stats.episodes.minutes + stats.movies.minutes) / 60 / 24).toFixed(2)}
			/>
			<OverviewItem label="Shows" value={stats.shows.watched} />
			<OverviewItem label="Movies" value={stats.movies.watched} />
			<OverviewItem
				label="Days spent on shows"
				value={(stats.episodes.minutes / 60 / 24).toFixed(2)}
			/>
			<OverviewItem
				label="Days spent on movies"
				value={(stats.movies.minutes / 60 / 24).toFixed(2)}
			/>
			<OverviewItem label="Episodes watched" value={stats.episodes.watched.toLocaleString()} />
		</div>
	)
})

export default TraktCard
