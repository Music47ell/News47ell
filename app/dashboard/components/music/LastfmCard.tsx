import { getStats } from '@/lib/lastfm'
import { Lastfm } from '@/lib/types'
import { displayNumbers } from '@/utils/formatters'

import OverviewItem from '../../components/OverviewItem'

const getLastFmStats = async () => {
	const { user } = await getStats()
	const { name, url, artist_count, playcount, track_count } = user as Lastfm['user']
	const registered = user.registered['#text']
	const registeredDate = new Date().getFullYear() - new Date(registered * 1000).getFullYear()
	const days = Math.round(
		(new Date().getTime() - new Date(registered * 1000).getTime()) / (1000 * 60 * 60 * 24)
	)
	const averagePlayCount = Math.round(playcount / days)

	return {
		name,
		url,
		artistsCount: artist_count,
		playCount: playcount,
		tracksCount: track_count,
		registeredDate,
		averagePlayCount,
	}
}

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const LastfmCard = asyncComponent(async () => {
	const stats = await getLastFmStats()
	return (
		<div className="mb-1 grid gap-3 py-2 md:grid-cols-2">
			<OverviewItem label="Account Age" value={stats.registeredDate} />
			<OverviewItem label="Artists" value={displayNumbers.format(stats.artistsCount)} />
			<OverviewItem label="Tracks" value={displayNumbers.format(stats.tracksCount)} />
			<OverviewItem label="Total Scrobbles" value={displayNumbers.format(stats.playCount)} />
			<OverviewItem label="Average Play" value={displayNumbers.format(stats.averagePlayCount)} />
		</div>
	)
})

export default LastfmCard
