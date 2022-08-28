import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'
import { GitHubIcon, PatreonIcon } from '@/components/icons'

export default function Sponsor(): JSX.Element {
	return (
		<>
			<PageSEO title={`Sponsor - ${siteMetadata.author}`} description={siteMetadata.description} />
			<SectionContainer>
				<div className="divide-y divide-gray-200 dark:divide-gray-700">
					<div className="space-y-2 pt-6 pb-8 md:space-y-5">
						<h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
							Support this Site
						</h1>

						<p>Below you can find ways to support me on GitHub Sponsors or through other means.</p>
					</div>
					<div className="container py-6">
						<section className="space-y-4">
							<h3 className="text-3xl font-bold leading-8 tracking-tight">Support Me On</h3>
							<div className="flex flex-wrap gap-x-4 gap-y-2">
								<Link
									href="https://github.com/sponsors/Music47ell"
									className="focus:ring-nfh-accent-primary/50 inline-flex items-center rounded bg-github px-5 py-2.5 text-center text-sm font-medium !text-white transition-colors hover:bg-github/60 focus:outline-none focus:ring-4"
								>
									<GitHubIcon className="mr-2 -ml-1 h-4 w-4 fill-white" />
									GitHub Sponsor
								</Link>
								<Link
									href="https://www.patreon.com/News47ell"
									className="focus:ring-nfh-accent-primary/50 inline-flex items-center rounded bg-patreon px-5 py-2.5 text-center text-sm font-medium !text-white transition-colors hover:bg-patreon/60 focus:outline-none focus:ring-4"
								>
									<PatreonIcon className="mr-2 -ml-1 h-4 w-4 fill-white" />
									Become a Patron
								</Link>
							</div>
						</section>
					</div>
				</div>
			</SectionContainer>
		</>
	)
}
