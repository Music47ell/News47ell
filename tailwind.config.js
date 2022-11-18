/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

const rgbToTailwind = (rgb) =>
	rgb
		.replace(/[^\d,]/g, '')
		.split(',')
		.join(' ')

module.exports = {
	experimental: {
		optimizeUniversalDefaults: true,
	},
	content: ['./pages/**/*.tsx', './components/**/*.tsx', './layouts/**/*.tsx', './lib/**/*.ts'],
	theme: {
		extend: {
			backgroundImage: {
				'arrow-up-pattern': "url('/images/others/arrow-up-pattern.svg')",
			},
			spacing: {
				'9/16': '56.25%',
			},
			lineHeight: {
				11: '2.75rem',
				12: '3rem',
				13: '3.25rem',
				14: '3.5rem',
			},
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				türkiye: '#E30A17',
				'nfh-background-primary': 'rgb(var(--background-primary) / <alpha-value>)',
				'nfh-background-secondary': 'rgb(var(--background-secondary) / <alpha-value>)',
				'nfh-text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
				'nfh-text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
				'nfh-accent-primary': 'rgb(var(--accent-primary) / <alpha-value>)',
				'nfh-accent-secondary': 'rgb(var(--accent-secondary) / <alpha-value>)',
				light: {
					'background-primary': rgbToTailwind('rgb(243, 244, 246)'),
					'background-secondary': rgbToTailwind('rgb(128, 128, 128)'),
					'text-primary': rgbToTailwind('rgb(17, 24, 39)'),
					'text-secondary': rgbToTailwind('rgb(31, 41, 55)'),
					'accent-primary': rgbToTailwind('rgb(220, 38, 38)'),
					'accent-secondary': rgbToTailwind('rgb(185, 28, 28)'),
				},
				dark: {
					'background-primary': rgbToTailwind('rgb(28, 25, 23)'),
					'background-secondary': rgbToTailwind('rgb(41, 37, 36)'),
					'text-primary': rgbToTailwind('rgb(250, 250, 249)'),
					'text-secondary': rgbToTailwind('rgb(245, 245, 244)'),
					'accent-primary': rgbToTailwind('rgb(244, 63, 94)'),
					'accent-secondary': rgbToTailwind('rgb(225, 29, 72)'),
				},
				hackerNews: {
					'background-primary': rgbToTailwind('rgb(246, 246, 239)'),
					'background-secondary': rgbToTailwind('rgb(255, 255, 255)'),
					'text-primary': rgbToTailwind('rgb(0, 0, 0)'),
					'text-secondary': rgbToTailwind('rgb(130, 130, 130)'),
					'accent-primary': rgbToTailwind('rgb(255, 102, 0)'),
					'accent-secondary': rgbToTailwind('rgb(255, 140, 64)'),
				},
				latte: {
					'background-primary': rgbToTailwind('rgb(239, 241, 245)'), // Base
					'background-secondary': rgbToTailwind('rgb(230, 233, 239)'), // Mantle
					'text-primary': rgbToTailwind('rgb(76, 79, 105)'), // Text
					'text-secondary': rgbToTailwind('rgb(156, 160, 176)'), // Overlay0
					'accent-primary': rgbToTailwind('rgb(136, 57, 239)'), // Mauve
					'accent-secondary': rgbToTailwind('rgb(30, 102, 245)'), // Blue
				},
				roséPineDawn: {
					'background-primary': rgbToTailwind('rgb(250, 244, 237)'), // Base
					'background-secondary': rgbToTailwind('rgb(242, 233, 222)'), // Overlay
					'text-primary': rgbToTailwind('rgb(87, 82, 121)'), // Text
					'text-secondary': rgbToTailwind('rgb(215, 130, 126)'), // Rose
					'accent-primary': rgbToTailwind('rgb(180, 99, 122)'), // Love
					'accent-secondary': rgbToTailwind('rgb(40, 105, 131)'), // Pine
				},
				dracula: {
					'background-primary': rgbToTailwind('rgb(40, 42, 54)'), // Background
					'background-secondary': rgbToTailwind('rgb(68, 71, 90)'), // Current Line
					'text-primary': rgbToTailwind('rgb(248, 248, 242)'), // Foreground
					'text-secondary': rgbToTailwind('rgb(139, 233, 253)'), // Cyan
					'accent-primary': rgbToTailwind('rgb(189, 147, 249)'), // Purple
					'accent-secondary': rgbToTailwind('rgb(98, 114, 164)'), // Comment
				},
				mocha: {
					'background-primary': rgbToTailwind('rgb(30, 30, 46)'), // Base
					'background-secondary': rgbToTailwind('rgb(24, 24, 37)'), // Mantle
					'text-primary': rgbToTailwind('rgb(205, 214, 244)'), // Text
					'text-secondary': rgbToTailwind('rgb(108, 112, 134)'), // Overlay0
					'accent-primary': rgbToTailwind('rgb(203, 166, 247)'), // Mauve
					'accent-secondary': rgbToTailwind('rgb(137, 180, 250)'), // Blue
				},
				roséPine: {
					'background-primary': rgbToTailwind('rgb(25, 23, 36)'), // Base
					'background-secondary': rgbToTailwind('rgb(38, 35, 58)'), // Overlay
					'text-primary': rgbToTailwind('rgb(224, 222, 244)'), // Text
					'text-secondary': rgbToTailwind('rgb(235, 188, 186)'), // Rose
					'accent-primary': rgbToTailwind('rgb(235, 111, 146)'), // Love
					'accent-secondary': rgbToTailwind('rgb(49, 116, 143)'), // Pine
				},
				wildberries: {
					'background-primary': rgbToTailwind('rgb(25, 00, 46)'), // Black Berry
					'background-secondary': rgbToTailwind('rgb(144, 00, 72)'), // Cherry
					'text-primary': rgbToTailwind('rgb(255, 14, 130)'), // Pink
					'text-secondary': rgbToTailwind('rgb(0, 255, 183)'), // Green
					'accent-primary': rgbToTailwind('rgb(250, 141, 62)'), // Orange
					'accent-secondary': rgbToTailwind('rgb(57, 158, 230)'), // Blue
				},
				nord: {
					'background-primary': rgbToTailwind('rgb(46, 52, 64)'),
					'background-secondary': rgbToTailwind('rgb(59, 66, 82)'),
					'text-primary': rgbToTailwind('rgb(229, 233, 240)'),
					'text-secondary': rgbToTailwind('rgb(236, 239, 244)'),
					'accent-primary': rgbToTailwind('rgb(136, 192, 208)'),
					'accent-secondary': rgbToTailwind('rgb(129, 161, 193)'),
				},
			},
			animation: {
				'loading-0': 'loading 1.4s ease-in-out infinite',
				'loading-1': 'loading 1.4s ease-in-out 0.2s infinite',
				'loading-2': 'loading 1.4s ease-in-out 0.4s infinite',
				'background-spin': 'halfSpin 10s ease-in-out infinite',
				'fade-in': 'fadeOut 5s ease-out-in',
				'fade-out': 'fadeOut 5s ease-in-out',
				'slide-in': 'slide-in 0.2s ease-out',
				'slide-out': 'slide-out 0.2s ease',
				wiggle: 'wiggle 1s linear',
			},
			keyframes: (theme) => ({
				fadeIn: {
					'0%': { backgroundColor: theme('colors.transparent') },
					'100%': { backgroundColor: theme('colors.red.300') },
				},
				fadeOut: {
					'0%': { backgroundColor: theme('colors.red.300') },
					'100%': { backgroundColor: theme('colors.transparent') },
				},
				'slide-in': {
					'0%': { opacity: 0, transform: 'translateY(16px)' },
					'100%': { opacity: 1, transform: 'translateY(0)' },
				},
				'slide-out': {
					'0%': { opacity: 1, transform: 'translateY(0px)' },
					'100%': { opacity: 0, transform: 'translateY(16px)' },
				},
				wiggle: {
					'0%': { transform: 'rotate(0.0deg)' },
					'10%': { transform: 'rotate(14deg)' },
					'20%': { transform: 'rotate(-8deg)' },
					'30%': { transform: 'rotate(14deg)' },
					'40%': { transform: 'rotate(-4deg)' },
					'50%': { transform: 'rotate(10.0deg)' },
					'60%': { transform: 'rotate(0.0deg)' },
					'100%': { transform: 'rotate(0.0deg)' },
				},
			}),
			typography: (theme) => ({
				theme: {
					css: [
						{
							color: theme('colors.nfh-text-primary'),
							'[class~="lead"]': {
								color: theme('colors.nfh-text-secondary'),
							},
							a: {
								color: theme('colors.nfh-accent-primary'),
								transition: 'color 150ms ease',
								'&:hover': {
									color: theme('colors.nfh-accent-secondary'),
								},
								textDecoration: 'none',
								code: { color: theme('colors.nfh-text-primary') },
							},
							h1: {
								fontWeight: '700',
								letterSpacing: theme('letterSpacing.tight'),
								color: theme('colors.nfh-accent-primary'),
							},
							h2: {
								fontWeight: '700',
								letterSpacing: theme('letterSpacing.tight'),
								color: theme('colors.nfh-accent-primary'),
							},
							h3: {
								fontWeight: '600',
								color: theme('colors.nfh-accent-primary'),
							},
							'h4,h5,h6': {
								color: theme('colors.nfh-accent-primary'),
							},
							pre: {
								margin: 0,
								padding: 0,
								overflowX: 'revert',
								borderRadius: theme('borderRadius.none'),
							},
							details: {
								backgroundColor: theme('colors.nfh-background-secondary'),
								paddingLeft: '4px',
								paddingRight: '4px',
								paddingTop: '2px',
								paddingBottom: '2px',
								borderRadius: '0.25rem',
							},
							hr: { borderColor: theme('colors.nfh-text-secondary') },
							'ol > li::before': {
								fontWeight: '600',
								color: theme('colors.nfh-text-secondary'),
							},
							'ul > li::before': {
								backgroundColor: theme('colors.nfh-text-primary'),
							},
							strong: { color: theme('colors.nfh-text-primary') },
							dd: { color: theme('colors.nfh-text-primary') },
							thead: {
								th: {
									color: theme('colors.nfh-text-primary'),
								},
							},
							blockquote: {
								color: theme('colors.nfh-text-secondary'),
								borderLeftColor: theme('colors.nfh-accent-primary'),
							},
						},
					],
				},
			}),
		},
	},
	variants: {},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('./helpers/brandColors'),
	],
}
