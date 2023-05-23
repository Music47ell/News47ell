import type { Metadata } from 'next'

import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'

import MoviesWatched from './components/MoviesWatched'
import ShowsWatched from './components/ShowsWatched'
import TraktCard from './components/TraktCard'

export const metadata: Metadata = {
	title: 'Shows - Dashboard',
	description: 'Display my recent entertainment activity.',
}

export default function Shows() {
	return (
		<SectionContainer>
			<div className="space-y-2 pt-6 md:space-y-5">
				<div className="md:flex md:items-baseline md:justify-between">
					<h1 className="text-3xl font-bold tracking-tight md:text-5xl">Movies & TV Shows</h1>
					<p className="text-xs">Powered by Trakt & TMDB API</p>
				</div>
				<div className="space-y-2 md:space-y-5">
					<Link
						href="/dashboard"
						className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg"
					>
						<span className="m-auto block w-6 text-xl">&#8592;</span>
					</Link>
				</div>
				<TraktCard />
			</div>
			<h3 className="text-2xl font-bold leading-8 tracking-tight">
				Most Recent Movies I've Watched
			</h3>
			<MoviesWatched />
			<h3 className="text-2xl font-bold leading-8 tracking-tight">
				Most Recent TV Shows I've Watched
			</h3>
			<ShowsWatched />
		</SectionContainer>
	)
}
