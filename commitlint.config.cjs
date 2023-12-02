module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			['feat', 'blog', 'page', 'refactor', 'style', 'ui', 'chore', 'build', 'fix', 'revert'],
		],
	},
}
