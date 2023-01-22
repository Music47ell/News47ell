import type { Action } from 'kbar'
import router from 'next/router'

const SECTIONS = {
	blogs: 'Blogs',
	projects: 'Projects',
	dashboard: 'Dashboard',
	snippets: 'Snippets',
	home: 'Home',
	uses: 'Uses',
	tweets: 'Tweets',
	goto: 'Go to',
	general: 'General',
	socials: 'Socials',
}

export const actions: Array<Action> = [
	{
		id: 'blog',
		name: 'Writing',
		shortcut: ['b'],
		keywords: 'writing words blogs publications',
		perform: () => router.push('/blog'),
		section: SECTIONS.goto,
		subtitle: 'My thoughts on software engineering and React.JS',
	},
	{
		id: 'projects',
		name: 'Projects',
		shortcut: ['p'],
		keywords: 'creating projects',
		perform: () => router.push('/projects'),
		section: SECTIONS.goto,
		subtitle: 'Showcase of my projects I build over the last year.',
	},
	{
		id: 'dashboard',
		name: 'Dashboard',
		shortcut: ['d'],
		keywords: 'dashboard spotify songs',
		perform: () => router.push('/dashboard'),
		section: SECTIONS.goto,
		subtitle: "Checkout my Top 10 Spotify® tracks. Song that I'm currently listening",
	},
	{
		id: 'snippets',
		name: 'Snippets',
		shortcut: ['s'],
		keywords: 'code snippets',
		perform: () => router.push('/snippets'),
		section: SECTIONS.goto,
		subtitle: 'Code snippets I use in my projects.',
	},
	{
		id: 'uses',
		name: 'Uses',
		shortcut: ['u'],
		keywords: 'uses laptop phone wfh setup pc',
		perform: () => router.push('/uses'),
		section: SECTIONS.goto,
		subtitle: 'Gear that I use that make me productive',
	},
	{
		id: 'social-github',
		name: 'GitHub',
		keywords: 'github',
		perform: () => window.open('https://github.com/omkark45', '_blank'),
		section: SECTIONS.socials,
	},
	{
		id: 'social-twitter',
		name: 'Twitter',
		keywords: 'twitter',
		perform: () => window.open('https://twitter.com/omkar_k45', '_blank'),
		section: SECTIONS.socials,
	},
]
