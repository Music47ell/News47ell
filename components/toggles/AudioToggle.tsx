import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi'
import { useSettings } from '@/context/store'
import { useSFX } from '@/hooks/useSFX'

const AudioToggle = (): JSX.Element => {
  const { soundEnabled, toggleSound } = useSettings()
  const { playSoundOn, playSoundOff, playPopEnter } = useSFX()

  const handleOnEnter = () => playPopEnter({ playbackRate: 1.5 })
  const handleOnClick = () => {
    toggleSound()
    soundEnabled ? playSoundOff() : playSoundOn()
  }

  return (
    <>
      <button
        type="button"
        title={soundEnabled ? 'Turn off sounds' : 'Turn on sounds'}
        aria-label={soundEnabled ? 'Turn off sounds' : 'Turn on sounds'}
        className="h-8 hover:animate-wiggle"
        id="volume-mode-switch"
        onMouseEnter={handleOnEnter}
        onClick={handleOnClick}
      >
        {soundEnabled === true ? <BiVolumeFull className="w-6 h-6 text-nfh-text-primary" /> : null}
        {soundEnabled === false ? <BiVolumeMute className="w-6 h-6 text-nfh-text-primary" /> : null}
      </button>
    </>
  )
}

export default AudioToggle
