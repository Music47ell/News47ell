import type { Metadata } from 'next'

import { SectionContainer } from '@/components/UI'
import { PageTitle } from '@/components/UI'
import { allBlogs } from '@/contentlayer/generated'
import { getBlogViews } from '@/lib/views'

import Codes from './components/codes'
import Music from './components/music'
import OverviewItem from './components/OverviewItem'
import SectionHeading from './components/SectionHeading'
import SectionSubHeading from './components/SectionSubHeading'
import Shows from './components/shows'

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
			<div className="flex flex-col gap-y-2">
				<PageTitle>Dashboard</PageTitle>
				<SectionSubHeading>
					<div className="text-neutral-400 md:flex-row md:items-center">
						<span>This dashboard diplsay activities collected from multiple sources.</span>
					</div>
				</SectionSubHeading>
			</div>
			<hr className="my-6 border-gray-700" />
			<section className="flex flex-col gap-y-5">
				<SectionHeading title="Site Stats" />
				<SectionSubHeading>
					<div className="text-neutral-400 md:flex-row md:items-center">
						<span>My site's stats</span>
					</div>
					<div className="text-sm text-neutral-500">Collected with Turso</div>
				</SectionSubHeading>
			</section>
			<div className="grid grid-cols-1 gap-3 lg:grid-cols-3 xl:grid-cols-3">
				<OverviewItem label="All Posts Views" value={views.toLocaleString()} />
				<OverviewItem label="Number of Posts" value={allBlogs.length} />
				<OverviewItem
					label="Number of Words"
					value={allBlogs.reduce((acc, curr) => acc + curr.wordsCount, 0).toLocaleString()}
				/>
			</div>
			<hr className="my-6 border-gray-700" />
			<Codes />
			<hr className="my-6 border-gray-700" />
			<Music />
			<hr className="my-6 border-gray-700" />
			<Shows />
		</SectionContainer>
	)
}
