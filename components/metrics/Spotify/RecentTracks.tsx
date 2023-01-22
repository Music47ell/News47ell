import { Tracks } from 'lib/types'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { Track } from '@/components/metrics/Spotify'
import fetcher from '@/lib/fetcher'

export default function RecentTracks(): JSX.Element {
	const { data } = useSWR<Tracks>('/api/recent-tracks', fetcher)

	const [currentTrack, setCurrentTrack] = useState<{
		id: number | null
		isPlaying: boolean
		audio: HTMLAudioElement | null
	}>({
		id: null,
		isPlaying: false,
		audio: null,
	})

	// Initial audio load when page is hydrated
	useEffect(() => {
		setCurrentTrack((c) => ({ ...c, audio: new Audio() }))
	}, [])

	useEffect(() => {
		// Call when track ends
		const onEnd = () => {
			setCurrentTrack((c) => ({ ...c, id: null, isPlaying: false }))
		}

		if (currentTrack.audio) {
			currentTrack.audio?.addEventListener('ended', onEnd)
			return () => {
				currentTrack.audio?.removeEventListener('ended', onEnd)
			}
		}
	}, [currentTrack.audio])

	const handleToggleMusic = (trackId: number, audioUrl: string) => {
		const isNewTrack = currentTrack.id !== trackId
		const isPlaying = isNewTrack || !currentTrack.isPlaying

		if (currentTrack.audio) {
			if (isNewTrack) currentTrack.audio.src = audioUrl // Switch to new song

			// Set volume to that track
			currentTrack.audio.volume = 0.15

			// Play new track, or stop the current one
			isPlaying ? currentTrack.audio.play() : currentTrack.audio.pause()
		}

		// Apply changes
		setCurrentTrack((c) => ({ ...c, id: trackId, isPlaying }))
	}

	if (!data) {
		return null
	}

	return (
		<div className="grid gap-2 md:grid-cols-2">
			{data.tracks.map((track, index) => (
				<Track
					ranking={index + 1}
					key={track.songUrl}
					onToggle={() => handleToggleMusic(index, track.audioUrl)}
					isPlaying={currentTrack.id === index && currentTrack.isPlaying}
					{...track}
				/>
			))}
		</div>
	)
}
