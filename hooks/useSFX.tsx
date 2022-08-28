import { useSettings } from '@/context/store'
import useSound from 'use-sound'

export const useSFX = () => {
	const { soundEnabled } = useSettings()

	const [playDark] = useSound('/sounds/night-vision.mp3', { soundEnabled })
	const [playLight] = useSound('/sounds/pigeons.mp3', { soundEnabled })
	const [playMouseClick] = useSound('/sounds/click.mp3', { soundEnabled })
	const [playPageTurn] = useSound('/sounds/page-turn.mp3', { soundEnabled })
	const [playSlide] = useSound('/sounds/slide.mp3', { soundEnabled })
	const [playSoundOn] = useSound('/sounds/sound-on.mp3', { volume: 0.5 })
	const [playSoundOff] = useSound('/sounds/sound-off.mp3', { volume: 0.5 })
	const [playPopEnter] = useSound('/sounds/pop.mp3', { volume: 0.5, soundEnabled })
	const [playPopClick] = useSound('/sounds/pop.mp3', { volume: 0.5, soundEnabled })
	const [playThemeOn] = useSound('/sounds/theme-on.mp3', { playbackRate: 0.75, volume: 0.5 })

	const [playThemeOff] = useSound('/sounds/theme-off.mp3', { playbackRate: 0.75, volume: 0.5 })

	return {
		playDark,
		playLight,
		playMouseClick,
		playPageTurn,
		playSlide,
		playSoundOn,
		playSoundOff,
		playPopEnter,
		playPopClick,
		playThemeOn,
		playThemeOff,
	}
}
