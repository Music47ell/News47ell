const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: ['./pages/**/*.tsx', './components/**/*.tsx', './layouts/**/*.tsx', './lib/**/*.ts'],
  theme: {
    extend: {
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
        'nfh-background-primary': 'var(--background-primary)',
        'nfh-background-secondary': 'var(--background-secondary)',
        'nfh-text-primary': 'var(--text-primary)',
        'nfh-text-secondary': 'var(--text-secondary)',
        'nfh-accent-primary': 'var(--accent-primary)',
        'nfh-accent-secondary': 'var(--accent-secondary)',
        dracula: {
          100: '#f8f8f2',
          200: '#8be9fd',
          300: '#bd93f9',
          400: '#6272a4',
          500: '#44475a',
          600: '#282a36',
        },
        hackerNews: {
          100: '#ffffff',
          200: '#000000',
          300: '#f6f6ef',
          400: '#828282',
          500: '#ff8c40',
          600: '#ff6600',
        },
        nord: {
          100: '#eceff4',
          200: '#e5e9f0',
          300: '#88c0d0',
          400: '#81a1c1',
          500: '#3b4252',
          600: '#2e3440',
        },
        ferrari: {
          100: '#ffffff',
          200: '#f6f6ef',
          300: '#000000',
          400: '#fff200',
          500: '#008c45',
          600: '#cd212a',
        },
        dos: {
          100: '#0000ff',
          200: '#ffff00',
          300: '#ff0000',
          400: '#ff00ff',
          500: '#000000',
          600: '#c0c0c0',
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
