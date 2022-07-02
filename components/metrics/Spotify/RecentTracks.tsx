import { Track } from '@/components/metrics/Spotify'
import fetcher from '@/lib/fetcher'
import useSWR from 'swr'
import { Tracks } from 'lib/types'

export default function RecentTracks(): JSX.Element {
  const { data } = useSWR<Tracks>('/api/recent-tracks', fetcher)

  if (!data) {
    return null
  }

  return (
    <>
      {data.tracks.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} {...track} />
      ))}
    </>
  )
}
