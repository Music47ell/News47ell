module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			['feat', 'blog', 'refactor', 'style', 'ui', 'chore', 'build', 'fix', 'revert'],
		],
	},
}
