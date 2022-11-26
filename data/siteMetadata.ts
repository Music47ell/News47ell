const siteMetadata = {
	title: 'News47ell',
	altTitle: 'NEWS FOR HELL',
	author: 'Ahmet ALMAZ',
	nickname: 'Music47ell',
	position: 'Founder and Editor-in-Chief',
	location: {
		country: 'Türkiye',
		emojiFlag: '🇹🇷',
	},
	headerTitle: 'News47ell',
	description: 'Tech news, reviews and interesting links',
	language: 'en-us',
	siteUrl: 'https://www.news47ell.com',
	siteRepo: 'https://github.com/News47ell/website',
	siteLogo: '/images/brand/logo.png',
	image: '/images/others/me.png',
	socialBanner: '/images/brand/twitter-card.png',
	email: 'ahmet@news47ell.com',
	twitter: 'Music47ell',
	codestats: 'Music47ell',
	trakt: 'Music47ell',
	lastfm: 'Music47ell',
	locale: 'en-US',
	postsPerPages: 10,
	adminNavLinks: [
		{ title: 'Admin Dashboard', href: '/admin' },
		{ title: 'Add Post', href: '/admin/add/post' },
		{ title: 'Add Page', href: '/admin/add/page' },
		{ title: 'Add Lyric', href: '/admin/add/lyric' },
		{ title: 'Add Quote', href: '/admin/add/quote' },
		{ title: 'Account Settings', href: '/account' },
		{ title: 'Sign out', href: '/api/auth/logout' },
	],
	orbitLinks: [
		{ title: 'Twitter', href: 'https://twitter.com/music47ell', icon: 'twitter' },
		{ title: 'GitHub', href: 'https://github.com/music47ell', icon: 'github' },
		{ title: 'LinkedIn', href: 'https://www.linkedin.com/in/music47ell', icon: 'linkedin' },
		{ title: 'Mastodon', href: 'https://mastodon.social/@music47ell', icon: 'mastodon' },
	],
	heroCardLinks: [
		{ title: 'Check the dashboard', href: '/dashboard' },
		{ title: 'My writings', href: '/blog' },
		{ title: 'More about me, myself and I', href: '/colophon' },
		{ title: "See what I'm doing now", href: '/now' },
		{ title: 'My resume', href: '/resume' },
	],
	headerNavLinks: [
		{ title: 'Blog', href: '/blog', icon: 'pencil' },
		{ title: 'Dashboard', href: '/dashboard', icon: 'chartPie' },
		{ title: 'Categories', href: '/blog/categories', icon: 'collection' },
		{ title: 'Tags', href: '/blog/tags', icon: 'tag' },
		{ title: 'Archive', href: '/blog/archive', icon: 'archive' },
		{ title: 'Uses', href: '/uses', icon: 'briefcase' },
		{ title: 'Now', href: '/now', icon: 'calendar' },
	],
	upperFooterLinks: [
		{ title: 'Links', href: '/links' },
		{ title: 'Legal', href: '/legal' },
		{ title: 'RSS', href: '/feed' },
		{ title: 'Acknowledgements', href: '/acknowledgements' },
		{ title: 'Support This Site', href: '/sponsor' },
	],
	lowerFooterLinks: [
		{ title: 'Supabase', href: 'https://supabase.io/', icon: 'supabase' },
		{ title: 'Next.js', href: 'https://nextjs.org/', icon: 'nextdotjs' },
		{ title: 'Tailwind CSS', href: 'https://tailwindcss.com/', icon: 'tailwindcss' },
		{ title: 'Vercel', href: 'https://vercel.com/', icon: 'vercel' },
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
		links: {
			title: 'All Links',
			text: 'https://www.news47ell.com/links',
		},
	},
	socialLinks: {
		author: [
			{
				title: 'Twitter',
				href: 'https://twitter.com/Music47ell',
				icon: 'twitter',
			},
			{
				title: 'GitHub',
				href: 'https://www.github.com/Music47ell',
				icon: 'github',
			},
			{
				title: 'LinkedIn',
				href: 'https://www.linkedin.com/in/music47ell/',
				icon: 'linkedin',
			},
			{
				title: 'Email',
				href: 'mailto:ahmet@news47ell.com',
				icon: 'mail',
			},
			{
				title: 'Resume',
				href: '/resume',
				icon: 'document',
			},
		],
		blog: [
			{
				title: 'Twitter',
				href: 'https://twitter.com/News47ell',
				icon: 'twitter',
			},
			{
				title: 'RSS',
				href: 'https://www.news47ell.com/feed',
				icon: 'rss',
			},
			{
				title: 'Sitemap',
				href: 'https://www.news47ell.com/sitemap.xml',
				icon: 'sitemap',
			},
		],
	},
}

export default siteMetadata
