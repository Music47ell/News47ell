import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export const store = createContext(null)

export const SoundProvider = ({ children }) => {
	const [soundEnabled, setSoundEnabled] = useState()

	return <store.Provider value={{ soundEnabled, setSoundEnabled }}>{children}</store.Provider>
}

export const useSettings = () => {
	const { soundEnabled, setSoundEnabled } = useContext(store)

	useEffect(() => {
		setSoundEnabled(window.localStorage.getItem('sound') === 'off' ? false : true)
	}, [setSoundEnabled])

	const toggleSound = useCallback(() => {
		const newSoundsEnabled = !soundEnabled
		setSoundEnabled(newSoundsEnabled)
		window.localStorage.setItem('sound', newSoundsEnabled ? 'on' : 'off')
	}, [setSoundEnabled, soundEnabled])

	return {
		soundEnabled,
		toggleSound,
	}
}
