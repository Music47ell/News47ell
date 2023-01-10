'use client'

import { GitHubIcon, PatreonIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'

export default function Sponsor() {
	return (
		<SectionContainer>
			<div className="divide-y divide-gray-200">
				<div className="space-y-2 pt-6 pb-8 md:space-y-5">
					<h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl">
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
								className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded bg-github px-4 py-2 !text-nfh-text-primary transition-colors hover:bg-github/50 sm:w-max lg:w-max"
							>
								<GitHubIcon className="mr-2 -ml-1 h-7 w-7 fill-white" />
								GitHub Sponsor
							</Link>
							<Link
								href="https://www.patreon.com/News47ell"
								className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded bg-patreon px-4 py-2 !text-nfh-text-primary transition-colors hover:bg-patreon/50 sm:w-max lg:w-max"
							>
								<PatreonIcon className="mr-2 -ml-1 h-7 w-7 fill-white" />
								Become a Patron
							</Link>
						</div>
					</section>
				</div>
			</div>
		</SectionContainer>
	)
}
