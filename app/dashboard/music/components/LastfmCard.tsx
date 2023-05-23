import { default as Link } from '@/components/Link'
import { getStats } from '@/lib/lastfm'
import { Lastfm } from '@/lib/types'

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
		<div className="relative flex w-full flex-col rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
			<div className="grid gap-x-0 gap-y-4 md:grid-cols-2 md:gap-x-12">
				<div className="flex items-center justify-between space-x-4">
					<span>Profile</span>

					<div className="flex items-center space-x-2">
						<Link href={stats.url} className="shrink-0">
							@{stats.name}
						</Link>
					</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Account Age</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{stats.registeredDate} years</div>
					</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Total Scrobbles</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{stats.playCount}</div>
					</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Average plays</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{stats.averagePlayCount} per day</div>
					</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Artists Count</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{stats.artistsCount} Artists</div>
					</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Tracks Count</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{stats.tracksCount} Tracks</div>
					</div>
				</div>
			</div>
		</div>
	)
})

export default LastfmCard
