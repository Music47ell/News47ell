/** @type {import('tailwindcss').Config} */

const rgbToTailwind = (rgb) =>
	rgb
		.replace(/[^\d,]/g, '')
		.split(',')
		.join(' ')

module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,tsx}',
		'./components/**/*.{js,ts,tsx}',
		'./layouts/**/*.{js,ts,tsx}',
		'./lib/**/*.ts',
	],
	theme: {
		extend: {
			colors: {
				türkiye: '#E30A17',
				'nfh-background-primary': 'rgb(var(--background-primary) / <alpha-value>)',
				'nfh-background-secondary': 'rgb(var(--background-secondary) / <alpha-value>)',
				'nfh-text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
				'nfh-text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
				'nfh-accent-primary': 'rgb(var(--accent-primary) / <alpha-value>)',
				'nfh-accent-secondary': 'rgb(var(--accent-secondary) / <alpha-value>)',
				dracula: {
					'background-primary': rgbToTailwind('rgb(40, 42, 54)'), // Background
					'background-secondary': rgbToTailwind('rgb(68, 71, 90)'), // Current Line
					'text-primary': rgbToTailwind('rgb(248, 248, 242)'), // Foreground
					'text-secondary': rgbToTailwind('rgb(139, 233, 253)'), // Cyan
					'accent-primary': rgbToTailwind('rgb(255, 85, 85)'), // Red
					'accent-secondary': rgbToTailwind('rgb(189, 147, 249)'), // Purple
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
				orbit: 'orbit 40s linear infinite',
				'orbit-reverse': 'orbit-reverse 40s linear infinite',
				'loading-bar': 'loading-bar 2s infinite',
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
				orbit: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(1turn)' },
				},
				'orbit-reverse': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(-1turn)' },
				},
				'loading-bar': {
					'0%, 100%': { transform: 'translateX(-95%)' },
					'50%': { transform: 'translateX(95%)' },
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
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
