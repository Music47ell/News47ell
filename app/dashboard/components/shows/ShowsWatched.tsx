import { MediaCard } from '@/components/UI'
import { getWatchedShows } from '@/lib/trakt'

const getTraktShows = async () => {
	const data = await getWatchedShows()

	return data
}

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const ShowsWatched = asyncComponent(async () => {
	const shows = await getTraktShows()

	return (
		<div className="grid gap-2 md:grid-cols-2">
			{shows.map((show, index) => (
				<MediaCard key={index} title={show.title} image={show.poster} url={show.url} />
			))}
		</div>
	)
})

export default ShowsWatched
