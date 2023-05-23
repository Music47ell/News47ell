import { default as Link } from '@/components/Link'
import { getStats } from '@/lib/trakt'

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
		<div className="relative flex w-full flex-col rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
			<div className="grid gap-x-0 gap-y-4 md:grid-cols-2 md:gap-x-12">
				<div className="flex items-center justify-between space-x-4">
					<span>Profile</span>

					<div className="flex items-center space-x-2">
						<Link href={stats.url} className="shrink-0">
							@{stats.user}
						</Link>
					</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Total Days</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">
							{((stats.episodes.minutes + stats.movies.minutes) / 60 / 24).toFixed(2)}
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Shows</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{stats.shows.watched}</div>
					</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Movies</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{stats.movies.watched}</div>
					</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Days spent on shows</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{(stats.episodes.minutes / 60 / 24).toFixed(2)}</div>
					</div>
				</div>
				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Days spent on movies</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{(stats.movies.minutes / 60 / 24).toFixed(2)}</div>
					</div>
				</div>
				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Episodes watched</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{stats.episodes.watched}</div>
					</div>
				</div>
			</div>
		</div>
	)
})

export default TraktCard
