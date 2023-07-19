import { MediaCard } from '@/components/UI'
import { getRecentTracks } from '@/lib/spotify'
import { Song } from '@/lib/types'

const getRecentTenTracks = async () => {
	const { items } = await getRecentTracks()
	const recentTracks = items.map(({ track }) => ({
		artist: track.artists ? track.artists.map((_artist) => _artist.name).join(', ') : '',
		songUrl: track.external_urls?.spotify,
		audioUrl: track?.preview_url,
		title: track?.name,
		album: track.album?.name,
		albumImage: track.album?.images[0].url,
	})) as Song[]

	return recentTracks
}

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const RecentTracks = asyncComponent(async () => {
	const recentTracks = await getRecentTenTracks()

	return (
		<div className="grid gap-2 py-2 md:grid-cols-2">
			{recentTracks.map((track, index) => (
				<MediaCard key={index} title={track.title} image={track.albumImage} url={track.songUrl} />
			))}
		</div>
	)
})

export default RecentTracks
