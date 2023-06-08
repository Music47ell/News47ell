import type { Metadata } from 'next'

import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'
import { PageTitle } from '@/components/UI'

import LastfmCard from './components/LastfmCard'
import RecentTracks from './components/RecentTracks'
import TopTracks from './components/TopTracks'

export const metadata: Metadata = {
	title: 'Music - Dashboard',
	description: 'Display my recent music activity.',
}

export default function Music() {
	return (
		<SectionContainer>
			<div className="space-y-2 pt-6 md:space-y-5">
				<div className="md:flex md:items-baseline md:justify-between">
					<PageTitle>Music</PageTitle>
					<p className="text-xs">Powered by Last.fm & Spotify API</p>
				</div>
				<div className="space-y-2 md:space-y-5">
					<Link
						href="/dashboard"
						className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg"
					>
						<span className="m-auto block w-6 text-xl">&#8592;</span>
					</Link>
					<Link
						href="/dashboard/music/recommend"
						className="inline-flex w-full items-center justify-center rounded bg-green-500 px-4 py-2 font-medium leading-5 !text-white hover:bg-green-500/50"
					>
						Recommend me some music
					</Link>
				</div>
				<LastfmCard />
			</div>
			<h3 className="text-2xl font-bold leading-8 tracking-tight">Most Recent Tracks</h3>
			<RecentTracks />
			<h3 className="text-2xl font-bold leading-8 tracking-tight">Daily Top Tracks</h3>
			<TopTracks />
		</SectionContainer>
	)
}
