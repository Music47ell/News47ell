'use client'

import { ArrowLeftIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { MoviesWatched, ShowsWatched } from '@/components/metrics/Trakt'
import { TraktCard } from '@/components/metrics/Trakt'
import { SectionContainer } from '@/components/UI'

export default function Shows() {
	return (
		<SectionContainer>
			<div className="space-y-2 pt-6 md:space-y-5">
				<div className="md:flex md:items-center md:justify-between">
					<h1 className="text-3xl font-bold tracking-tight md:text-5xl">Movies & TV Shows</h1>
					<p className="text-xs">Powered by Trakt & TMDB API</p>
				</div>
				<div className="space-y-2 md:space-y-5">
					<Link
						href="/dashboard"
						className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg"
					>
						<ArrowLeftIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
					</Link>
				</div>
				<TraktCard />
			</div>
			<p>List of recent 10 movies I've watched</p>
			<MoviesWatched />
			<p>List of recent 10 tv shows I've watched</p>
			<ShowsWatched />
		</SectionContainer>
	)
}
