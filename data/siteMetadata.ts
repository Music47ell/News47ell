import { CoffeeIcon, DashboardIcon, InfoIcon, PenIcon } from '../components/icons'

const siteMetadata = {
	title: 'News47ell',
	altTitle: 'NEWS FOR HELL',
	description: 'Tech news, reviews and interesting links',
	siteUrl: 'https://www.news47ell.com',
	email: 'ahmet@news47ell.com',
	locale: 'en-US',
	githubSponsorUrl: 'https://github.com/sponsors/Music47ell',
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
		{ title: 'Dashboard', href: '/dashboard', icon: DashboardIcon, activePath: /^\/dashboard*/ },
		{ title: 'Blog', href: '/blog', icon: PenIcon, activePath: /^\/blog*/ },
		{ title: 'Colophon', href: '/colophon', icon: InfoIcon, activePath: /^\/colophon*/ },
		{ title: 'Sponsors', href: '/sponsors', icon: CoffeeIcon, activePath: /^\/sponsors*/ },
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
	affiliateLinks: [
		{
			title: 'BunnyCDN',
			href: 'https://www.news47ell.com/recommends/bunnycdn',
		},
		{
			title: 'Cloudinary',
			href: 'https://www.news47ell.com/recommends/cloudinary',
		},
		{
			title: 'TorGuard',
			href: 'https://www.news47ell.com/recommends/torguard',
		},
		{
			title: 'Windscribe',
			href: 'https://www.news47ell.com/recommends/windscribe',
		},
		{
			title: 'Kraken',
			href: 'https://www.news47ell.com/recommends/kraken',
		},
		{
			title: 'ShortPixel',
			href: 'https://www.news47ell.com/recommends/shortpixel',
		},
		{
			title: 'Dropbox',
			href: 'https://www.news47ell.com/recommends/dropbox',
		},
		{
			title: 'CamScanner',
			href: 'https://www.news47ell.com/recommends/camscanner',
		},
		{
			title: 'NextDNS',
			href: 'https://www.news47ell.com/recommends/nextdns',
		},
		{
			title: 'Filen',
			href: 'https://www.news47ell.com/recommends/filen',
		},
		{
			title: 'Unlocator',
			href: 'https://www.news47ell.com/recommends/unlocator',
		},
		{
			title: 'GeneratePress',
			href: 'https://www.news47ell.com/recommends/generatepress',
		},
		{
			title: 'CloudImage',
			href: 'https://www.news47ell.com/recommends/cloudimage',
		},
		{
			title: 'GitKraken',
			href: 'https://www.news47ell.com/recommends/gitkraken',
		},
		{
			title: 'AirTable',
			href: 'https://www.news47ell.com/recommends/airtable',
		},
		{
			title: 'Lightning Base',
			href: 'https://www.news47ell.com/recommends/lightningbase',
		},
		{
			title: 'DigitalOcean',
			href: 'https://www.news47ell.com/recommends/digitalocean',
		},
		{
			title: 'Skiff',
			href: 'https://www.news47ell.com/recommends/skiff',
		},
	],
}

export default siteMetadata
