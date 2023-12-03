/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
export default function astroExpressiveCodeOptions() {
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
