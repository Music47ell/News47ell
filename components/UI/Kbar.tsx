import {
	Action,
	KBarAnimator,
	KBarPortal,
	KBarPositioner,
	KBarProvider,
	KBarResults,
	KBarSearch,
	useMatches,
} from 'kbar'
import React from 'react'

type KBarProps = {
	children: React.ReactNode
}

const KBar = (props: KBarProps) => {
	const { children } = props

	const actions: Action[] = [
		{
			id: 'copy-link',
			name: 'Copy Link',
			keywords: 'copy link',
			section: 'General',
			perform: async () => {
				if (!navigator?.clipboard) {
					console.error('Clipboard API not supported!')
					return
				}

				try {
					await navigator.clipboard.writeText(window.location.href)
					return () => alert('Copied link to clipboard!')
				} catch (err) {
					console.error('Failed to copy!', err)
				}
			},
		},
		{
			id: 'source-code',
			name: 'Source code',
			keywords: 'source code github',
			section: 'General',
			perform: () => window.open('https://github.com/Music47ell/News47ell', '_blank'),
		},
		{
			id: 'blog',
			name: 'Blog',
			keywords: 'Go to blog',
			section: 'Go to',
			perform: () => (window.location.pathname = 'blog'),
		},
		{
			id: 'dashboard',
			name: 'Dashboard',
			keywords: 'Go to dashboard',
			section: 'Go to',
			perform: () => (window.location.pathname = 'dashboard'),
		},
		{
			id: 'tags',
			name: 'Tags',
			keywords: 'Go to tags',
			section: 'Go to',
			perform: () => (window.location.pathname = 'blog/tags'),
		},
		{
			id: 'colophon',
			name: 'Colophon',
			keywords: 'Go to colophon',
			section: 'Go to',
			perform: () => (window.location.pathname = 'colophon'),
		},
		{
			id: 'uses',
			name: 'Uses',
			keywords: 'Go to uses',
			section: 'Go to',
			perform: () => (window.location.pathname = 'uses'),
		},
		{
			id: 'now',
			name: 'Now',
			keywords: 'Go to now',
			section: 'Go to',
			perform: () => (window.location.pathname = 'now'),
		},
		{
			id: 'links',
			name: 'Links',
			keywords: 'Go to links',
			section: 'Go to',
			perform: () => (window.location.pathname = 'links'),
		},
		{
			id: 'feeds',
			name: 'Feeds',
			keywords: 'Go to feeds',
			section: 'Go to',
			perform: () => (window.location.pathname = 'feeds'),
		},
		{
			id: 'sponsor',
			name: 'Sponsor',
			keywords: 'Go to sponsor',
			section: 'Go to',
			perform: () => (window.location.pathname = 'sponsor'),
		},
		{
			id: 'resume',
			name: 'Rsumee',
			keywords: 'Go to resume',
			section: 'Go to',
			perform: () => (window.location.pathname = 'resume'),
		},
		{
			id: 'github',
			name: 'GitHub',
			keywords: 'github',
			section: 'Social',
			perform: () => window.open('https://github.com/music47ell', '_blank'),
		},
		{
			id: 'twitter',
			name: 'Twitter',
			keywords: 'tw Twitter',
			section: 'Social',
			perform: () => window.open('https://twitter.com/music47ell', '_blank'),
		},
		{
			id: 'linkedin',
			name: 'LinkedIn',
			keywords: 'li LinkedIN',
			section: 'Social',
			perform: () => window.open('https://www.linkedin.com/in/music47ell', '_blank'),
		},
	]

	return (
		<>
			<KBarProvider actions={actions}>
				<KBarPortal>
					<KBarPositioner className="z-50 bg-nfh-background-primary/10">
						<KBarAnimator className="w-full max-w-lg rounded-lg bg-nfh-background-secondary/90 shadow-2xl transition-all">
							<KBarSearch className="w-full bg-transparent py-3 px-6 outline-none" />
							<Results />
						</KBarAnimator>
					</KBarPositioner>
				</KBarPortal>
				{children}
			</KBarProvider>
		</>
	)
}

export default KBar

const Results = () => {
	const { results } = useMatches()

	return (
		<KBarResults
			items={results}
			onRender={({ item, active }) =>
				typeof item === 'string' ? (
					<div className="select-none px-4 pt-4 pb-2 text-[10px] uppercase tracking-[1px]">
						{item}
					</div>
				) : (
					<div
						className={`${
							active
								? 'border-l-2 border-nfh-accent-primary bg-nfh-accent-secondary'
								: 'border-l-2 border-l-transparent bg-transparent'
						} flex cursor-pointer items-center justify-between py-3 px-4 transition-colors`}
					>
						<div className="flex items-center">
							{item.icon && <div className="mr-4">{item.icon}</div>}
							<span className="text-base">{item.name}</span>
						</div>
					</div>
				)
			}
		/>
	)
}
