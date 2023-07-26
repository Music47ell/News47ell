import { MediaCard } from '@/components/UI'
import { getTopTracks } from '@/lib/spotify'
import { Song } from '@/lib/types'

const getTopTenTracks = async () => {
	const { items } = await getTopTracks()
	const topTracks = items.map((track) => ({
		artist: track.artists.map((_artist) => _artist.name).join(', '),
		songUrl: track.external_urls.spotify,
		audioUrl: track.preview_url,
		title: track.name,
		album: track.album.name,
		albumImage: track.album.images[0].url,
	})) as Song[]

	return topTracks
}

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const TopTracks = asyncComponent(async () => {
	const topTracks = await getTopTenTracks()

	return (
		<div className="grid gap-2 py-2 md:grid-cols-2">
			{topTracks.map((track, index) => (
				<MediaCard key={index} title={track.title} image={track.albumImage} url={track.songUrl} />
			))}
		</div>
	)
})

export default TopTracks
