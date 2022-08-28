import { ArrowLeftIcon } from '@/components/icons'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { default as Link } from '@/components/Link'
import { TopLanguages } from '@/components/metrics/CodeStats'
import { CodeStatsCard } from '@/components/metrics/CodeStats'
import { SectionContainer } from '@/components/UI'

export default function Codes(): JSX.Element {
	return (
		<>
			<PageSEO
				title={`Music Dashboard - ${siteMetadata.author}`}
				description={siteMetadata.description}
			/>
			<SectionContainer>
				<div className="space-y-2 pt-6 md:space-y-5">
					<div className="md:flex md:items-center md:justify-between">
						<h1 className="text-3xl font-bold tracking-tight md:text-5xl">Codes</h1>
						<p className="text-xs">Powered by CodeStats API</p>
					</div>
					<div className="space-y-2 md:space-y-5">
						<Link
							href="/dashboard"
							className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg"
						>
							<ArrowLeftIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
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
		</>
	)
}
