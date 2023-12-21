const siteMetadata = {
	title: 'News47ell',
	altTitle: 'NEWS FOR HELL',
	description: 'Tech news, reviews and interesting links',
	username: 'news47ell',
	siteUrl: 'https://www.news47ell.com',
	siteLogo: '/images/brand/logo.png',
	email: 'ahmet@news47ell.com',
	locale: 'en-US',
	githubSponsorUrl: 'https://github.com/sponsors/Music47ell',
	socials: [
		{ title: 'Twitter', url: 'https://twitter.com/news47ell' },
		{ title: 'Facebook', url: 'https://www.facebook.com/news47ell' },
		{ title: 'LinkedIn', url: 'https://www.linkedin.com/company/news47ell' },
		{ title: 'Mastodon', url: 'https://mastodon.social/@news47ell' },
	],
	author: {
		name: 'Ahmet ALMAZ',
		username: 'Music47ell',
		occupation: 'Founder and Editor-in-Chief | Full Stack Developer',
		avatar: '/images/others/me.png',
		location: {
			country: 'Türkiye',
			emojiFlag: '🇹🇷',
		},
		socials: [
			{ title: 'Twitter', url: 'https://twitter.com/music47ell' },
			{ title: 'GitHub', url: 'https://github.com/music47ell' },
			{ title: 'LinkedIn', url: 'https://www.linkedin.com/in/music47ell' },
			{ title: 'Mastodon', url: 'https://mastodon.social/@music47ell' },
		],
	},
	NavLinks: [
		{ title: 'Blog', href: '/blog', activePath: /^\/blog*/ },
		{ title: 'Tags', href: '/blog/tags', activePath: /^\/blog\/tags*/ },
		{ title: 'Projects', href: '/projects', activePath: /^\/projects*/ },
		{ title: 'Sponsors', href: '/sponsors', activePath: /^\/sponsors*/ },
		{ title: 'Colophon', href: '/colophon', activePath: /^\/colophon*/ },
	],
}

export default siteMetadata
