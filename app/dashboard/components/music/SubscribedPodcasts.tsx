import { MediaCard } from '@/components/UI'
import { getSubscribedShows } from '@/lib/spotify'
import { Podcast } from '@/lib/types'

const getRecentTenPodcasts = async () => {
	const { items } = await getSubscribedShows()
	const subscribedShows = items.map(({ show }) => ({
		podcastUrl: show.external_urls?.spotify,
		title: show.name,
		podcastImage: show.images[0].url,
	})) as Podcast[]

	return subscribedShows
}

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const RecentPodcasts = asyncComponent(async () => {
	const recentPodcasts = await getRecentTenPodcasts()

	return (
		<div className="grid gap-2 py-2 md:grid-cols-2">
			{recentPodcasts.map((show, index) => (
				<MediaCard key={index} title={show.title} image={show.podcastImage} url={show.podcastUrl} />
			))}
		</div>
	)
})

export default RecentPodcasts
