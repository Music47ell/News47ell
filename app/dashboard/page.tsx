import type { Metadata } from 'next'

import { FilmIcon, MusicIcon, TerminalIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'
import { PageTitle } from '@/components/UI'
import { allBlogs } from '@/contentlayer/generated'
import { getBlogViews } from '@/lib/views'

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Dashboard for my recent activity.',
}

export default async function Dashboard() {
	let views

	try {
		;[views] = await Promise.all([getBlogViews()])
	} catch (error) {
		console.error(error)
	}
	return (
		<SectionContainer>
			<div className="md:flex md:items-baseline md:justify-between">
				<PageTitle>Dashboard</PageTitle>
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
			<div className="md:flex md:items-baseline md:justify-between">
				<h3 className="text-2xl font-bold leading-8 tracking-tight">Site Statistics</h3>
				<p className="text-xs">Collected with Turso</p>
			</div>
			<div className="grid grid-cols-1 gap-3 lg:grid-cols-3 xl:grid-cols-3">
				<div className="flex w-full items-center justify-between rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
					<h6 className="flex items-center">All Posts Views</h6>

					<div className="flex items-center rounded-lg text-center">
						<h2 className="m-0 text-3xl font-bold">{views.toLocaleString()}</h2>
					</div>
				</div>
				<div className="flex w-full items-center justify-between rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
					<h6 className="flex items-center">Number of Posts</h6>

					<div className="flex items-center rounded-lg text-center">
						<h2 className="m-0 text-3xl font-bold">{allBlogs.length}</h2>
					</div>
				</div>
				<div className="flex w-full items-center justify-between rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
					<h6 className="flex items-center">Number of Words</h6>

					<div className="flex items-center rounded-lg text-center">
						<h2 className="m-0 text-3xl font-bold">
							{allBlogs.reduce((acc, curr) => acc + curr.wordsCount, 0).toLocaleString()}
						</h2>
					</div>
				</div>
			</div>
		</SectionContainer>
	)
}
