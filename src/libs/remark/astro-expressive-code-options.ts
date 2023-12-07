import type { AstroExpressiveCodeOptions } from 'astro-expressive-code'

export const astroExpressiveCodeOptions = (): AstroExpressiveCodeOptions => {
	return {
		themes: ['dracula'],
		styleOverrides: {
			// You can optionally override the plugin's default styles here
			textMarkers: {
				// Make default marker color slightly purple
				markHue: '310',
				// Reduce marker border opacity
				borderOpacity: '100%',
			},
		},
	}
}