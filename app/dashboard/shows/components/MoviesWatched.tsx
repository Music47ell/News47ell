import { MediaCard } from '@/components/UI'
import { getWatchedMovies } from '@/lib/trakt'

const getTraktMovies = async () => {
	const data = await getWatchedMovies()

	return data
}

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const MoviesWatched = asyncComponent(async () => {
	const movies = await getTraktMovies()

	return (
		<div className="grid gap-2 md:grid-cols-2">
			{movies.map((movie, index) => (
				<MediaCard key={index} title={movie.title} image={movie.poster} url={movie.url} />
			))}
		</div>
	)
})

export default MoviesWatched
