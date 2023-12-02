/** @type {import("prettier").Config} */
export default {
	useTabs: true,
	tabWidth: 2,
	semi: false,
	singleQuote: true,
	printWidth: 100,
	trailingComma: 'es5',
	bracketSpacing: true,
	plugins: ['prettier-plugin-astro'],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
}
