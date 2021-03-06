import { useEffect, useState } from 'react'
import Router from 'next/router'
import { Track } from '@/components/metrics/Spotify'
import fetcher from '@/lib/fetcher'
import useSWR from 'swr'
import { Tracks } from 'lib/types'

export default function TopTracks(): JSX.Element {
  const { data } = useSWR<Tracks>('/api/top-tracks', fetcher)

  const [currentTrack, setCurrentTrack] = useState<{
    id: number | null
    isPlaying: boolean
    audio: HTMLAudioElement | null
  }>({
    id: null,
    isPlaying: false,
    audio: null,
  })

  // Stop audio if route is changed
  Router.events.on('routeChangeComplete', () => {
    if (currentTrack?.audio) {
      currentTrack.audio.pause()
      currentTrack.audio.currentTime = 0
    }
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
    <>
      {data.tracks.map((track, index) => (
        <Track
          ranking={index + 1}
          key={track.songUrl}
          onToggle={() => handleToggleMusic(index, track.audioUrl)}
          isPlaying={currentTrack.id === index && currentTrack.isPlaying}
          {...track}
        />
      ))}
    </>
  )
}
