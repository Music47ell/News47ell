'use client'

import { FilmIcon, MusicIcon, TerminalIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'
import StatsLayout from '@/layouts/StatsLayout'

export default function Dashboard() {
	return (
		<SectionContainer>
			<div className="md:flex md:items-center md:justify-between">
				<h1 className="text-3xl font-bold tracking-tight md:text-5xl">Dashboard</h1>
				<p className="text-xs">updated every 60 seconds</p>
			</div>

			<div className="grid grid-cols-3 gap-3">
				<Link
					className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg hover:bg-nfh-accent-secondary"
					href="/dashboard/codes"
				>
					<TerminalIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
				</Link>
				<Link
					className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg hover:bg-nfh-accent-secondary"
					href="/dashboard/music"
				>
					<MusicIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
				</Link>
				<Link
					href="/dashboard/shows"
					className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg hover:bg-nfh-accent-secondary"
				>
					<FilmIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
				</Link>
			</div>
			<StatsLayout />
		</SectionContainer>
	)
}
