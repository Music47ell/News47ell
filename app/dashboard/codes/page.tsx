import type { Metadata } from 'next'

import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'

import CodeStatsCard from './components/CodeStatsCard'
import TopLanguages from './components/TopLanguages'

export const metadata: Metadata = {
	title: 'Codes - Dashboard',
	description: 'Display my recent coding activity.',
}

export default function Codes() {
	return (
		<SectionContainer>
			<div className="space-y-2 pt-6 md:space-y-5">
				<div className="md:flex md:items-baseline md:justify-between">
					<h1 className="text-3xl font-bold tracking-tight md:text-5xl">Codes</h1>
					<p className="text-xs">Powered by CodeStats API</p>
				</div>
				<div className="space-y-2 md:space-y-5">
					<Link
						href="/dashboard"
						className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg"
					>
						<span className="m-auto block w-6 text-xl">&#8592;</span>
					</Link>
				</div>
				<CodeStatsCard />
			</div>
			<h3 className="text-2xl font-bold leading-8 tracking-tight">
				Top Programming Languages I use
			</h3>
			<div className="flex flex-col space-y-4">
				<TopLanguages />
			</div>
		</SectionContainer>
	)
}
