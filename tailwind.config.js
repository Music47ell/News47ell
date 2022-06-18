/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: ['./pages/**/*.tsx', './components/**/*.tsx', './layouts/**/*.tsx', './lib/**/*.ts'],
  theme: {
    extend: {
      backgroundColor: {
        main: withOpacity('--color-main'),
        'off-main': withOpacity('--color-off-main'),
        primary: withOpacity('--color-primary'),
        secondary: withOpacity('--color-secondary'),
        muted: withOpacity('--color-text-muted'),
      },
      textColor: {
        main: withOpacity('--color-text-main'),
        muted: withOpacity('--color-text-muted'),
        'muted-hover': withOpacity('--color-text-muted-hover'),
        primary: withOpacity('--color-primary'),
        secondary: withOpacity('--color-secondary'),
      },
      borderColor: {
        main: withOpacity('--color-text-main'),
        muted: withOpacity('--color-text-muted'),
        'muted-hover': withOpacity('--color-text-muted-hover'),
        primary: withOpacity('--color-primary'),
        secondary: withOpacity('--color-secondary'),
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
        primary: colors.cyan,
        gray: colors.neutral,
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
      ringColor: {
        primary: withOpacity('--color-primary'),
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
              color: 'var(--color-text-mainmain)',
              '[class~="lead"]': {
                color: 'var(color-text-muted)',
              },
              a: {
                color: theme('textColor.primary'),
                transition: 'color 150ms ease',
                '&:hover': {
                  color: theme('textColor.muted-hover'),
                },
                textDecoration: 'none',
                code: { color: theme('colors.primary.400') },
              },
              h1: {
                fontWeight: '700',
                letterSpacing: theme('letterSpacing.tight'),
                color: 'var(--color-text-mainmain)',
              },
              h2: {
                fontWeight: '700',
                letterSpacing: theme('letterSpacing.tight'),
                color: 'var(--color-text-mainmain)',
              },
              h3: {
                fontWeight: '600',
                color: 'var(--color-text-mainmain)',
              },
              'h4,h5,h6': {
                color: 'var(--color-text-mainmain)',
              },
              code: {
                color: 'var(--color-text-mainmain)',
              },
              pre: {
                marginTop: 0,
                borderRadius: theme('borderRadius.none'),
                color: 'var(--color-text-muted)',
                backgroundColor: theme('backgroundColor.off-main'),
              },
              'code::before': {
                content: 'none',
              },
              'code::after': {
                content: 'none',
              },
              details: {
                backgroundColor: theme('backgroundColor.off-main'),
                paddingLeft: '4px',
                paddingRight: '4px',
                paddingTop: '2px',
                paddingBottom: '2px',
                borderRadius: '0.25rem',
              },
              hr: { borderColor: 'var(--color-text-muted)' },
              'ol > li::before': {
                fontWeight: '600',
                color: 'var(--color-text-muted)',
              },
              'ul > li::before': {
                backgroundColor: theme('textColor.primary'),
              },
              strong: { color: 'var(--color-text-main)' },
              dd: { color: 'var(--color-text-main)' },
              thead: {
                th: {
                  color: theme('colors.gray.100'),
                },
              },
              blockquote: {
                color: 'var(--color-text-muted)',
                borderLeftColor: theme('colors.gray.600'),
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
