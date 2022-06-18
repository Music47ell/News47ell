import { useSettings } from '@/context/store'
import useSound from 'use-sound'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSFX = () => {
  const { soundEnabled } = useSettings()

  const [playDark] = useSound('/sounds/night-vision.mp3', { soundEnabled })
  const [playLight] = useSound('/sounds/pigeons.mp3', { soundEnabled })
  const [playMouseClick] = useSound('/sounds/click.mp3', { soundEnabled })
  const [playPageTurn] = useSound('/sounds/page-turn.mp3', { soundEnabled })
  const [playSlide] = useSound('/sounds/slide.mp3', { soundEnabled })
  const [playSoundOn] = useSound('/sounds/sound-on.mp3')
  const [playSoundOff] = useSound('/sounds/sound-off.mp3')

  return {
    playDark,
    playLight,
    playMouseClick,
    playPageTurn,
    playSlide,
    playSoundOn,
    playSoundOff,
  }
}
