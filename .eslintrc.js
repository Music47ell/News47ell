module.exports = {
  root: true,
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  plugins: ['tailwindcss'],
  extends: [
    'next',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'no-unused-vars': 0,
    'react/no-unescaped-entities': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  settings: {
    tailwindcss: {
      whitelist: [
        'nfh-background-primary',
        'nfh-background-secondary',
        'nfh-text-primary',
        'nfh-text-secondary',
        'nfh-accent-primary',
        'nfh-accent-secondary',
        'fill-nfh-background-primary',
        'fill-nfh-background-secondary',
        'fill-nfh-text-primary',
        'fill-nfh-text-secondary',
        'fill-nfh-accent-primary',
        'fill-nfh-accent-secondary',
        'border-y',
        'fill-spotify',
        'fill-trakt',
        'h-entry',
        'dt-published',
        'dt-edited',
        'p-summary',
        'u-url',
        'p-name',
        'p-author',
        'h-card',
        'e-content',
        'p-category',
        'user-profile',
        'u-email',
        'u-photo',
        'p-nickname',
        'p-note',
        'p-country-name',
        'p-country-flag',
        'copyright',
        'year',
        'site-credit',
      ],
    },
  },
}
