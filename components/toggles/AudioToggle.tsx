import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi'
import { useSettings } from '@/context/store'
import { useSFX } from '@/hooks/useSFX'

const AudioToggle = (): JSX.Element => {
  const { soundEnabled, toggleSound } = useSettings()
  const { playSoundOn, playSoundOff } = useSFX()

  const handleSounds = () => {
    toggleSound()
    soundEnabled ? playSoundOff() : playSoundOn()
  }

  return (
    <>
      <button
        type="button"
        title={soundEnabled ? 'Turn off sounds' : 'Turn on sounds'}
        aria-label={soundEnabled ? 'Turn off sounds' : 'Turn on sounds'}
        className="flex text-sm focus:outline-none"
        id="volume-mode-switch"
        onClick={handleSounds}
      >
        {soundEnabled === true ? <BiVolumeFull className="w-6 h-6" /> : null}
        {soundEnabled === false ? <BiVolumeMute className="w-6 h-6" /> : null}
      </button>
    </>
  )
}

export default AudioToggle
