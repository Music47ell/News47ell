const siteMetadata = {
	title: 'News47ell',
	altTitle: 'NEWS FOR HELL',
	description: 'Tech news, reviews and interesting links',
	siteUrl: 'https://www.news47ell.com',
	email: 'ahmet@news47ell.com',
	locale: 'en-US',
	author: {
		name: 'Ahmet ALMAZ',
		username: 'Music47ell',
		occupation: 'Founder and Editor-in-Chief | Full Stack Developer',
		avatar: '/images/others/me.png',
		location: {
			country: 'Türkiye',
			emojiFlag: '🇹🇷',
		},
		social: [
			{ title: 'Twitter', href: 'https://twitter.com/music47ell' },
			{ title: 'GitHub', href: 'https://github.com/music47ell' },
			{ title: 'LinkedIn', href: 'https://www.linkedin.com/in/music47ell' },
			{ title: 'Mastodon', href: 'https://mastodon.social/@music47ell' },
		],
	},
	headerNavLinks: [
		{ title: 'Dashboard', href: '/dashboard', activePath: /^\/dashboard*/ },
		{ title: 'Blog', href: '/blog', activePath: /^\/blog*/ },
		{ title: 'Colophon', href: '/colophon', activePath: /^\/colophon*/ },
		{ title: 'Resume', href: '/resume', activePath: /^\/resume*/ },
	],
	curlCardLinks: {
		github: { title: 'GitHub', text: 'https://github.com/music47ell' },
		twitter: {
			title: 'Twitter',
			text: 'https://twitter.com/music47ell',
		},
		linkedIn: {
			title: 'LinkedIn',
			text: 'https://www.linkedin.com/in/music47ell',
		},
		resume: {
			title: 'Resume',
			text: 'https://www.news47ell.com/resume',
		},
	},
}

export default siteMetadata
