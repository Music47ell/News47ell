import Vibrant from 'node-vibrant'
import { useEffect, useMemo, useReducer } from 'react'

import { useHasMounted } from '@/hooks/useHasMounted'
import { PaletteColors, PaletteState } from '@/lib/types'
import camelCase from '@/utils/came-case'

const initialState: PaletteState = {
	loading: true,
	data: {},
	error: undefined,
}

const defaultPaletteData: PaletteState = {
	data: {},
	loading: false,
	error: Error('Missing image url'),
}

function reducer(state: PaletteState, action): PaletteState {
	switch (action.type) {
		case 'getPalette':
			return initialState
		case 'resolvePalette':
			return { ...state, data: action.payload, loading: false }
		case 'rejectPalette':
			return { ...state, error: action.payload, loading: false }
	}
}

async function getPalette(src: string) {
	const palette = await Vibrant.from(src).getPalette()
	const setPaletteColor = (acc, paletteName) => ({
		...acc,
		[camelCase(paletteName)]: palette[paletteName]?.hex,
	})

	return Object.keys(palette).reduce<PaletteColors>(setPaletteColor, {})
}

function usePalette(src: string) {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		let subscribed = true
		!subscribed || dispatch({ type: 'getPalette' })

		getPalette(src)
			.then((palette) => {
				!subscribed || dispatch({ type: 'resolvePalette', payload: palette })
			})
			.catch((ex) => {
				!subscribed || dispatch({ type: 'rejectPalette', payload: ex })
			})

		return () => {
			subscribed = false
		}
	}, [src])

	return state
}

export const useSafePalette = (imageUrl: string | null | undefined): PaletteState => {
	const hasMounted = useHasMounted()

	const internalImageUrl = useMemo<string>(() => {
		if (!hasMounted) return ''
		return imageUrl || ''
	}, [hasMounted, imageUrl])

	const paletteData = usePalette(internalImageUrl)

	return paletteData || defaultPaletteData
}
