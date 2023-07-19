import type { Metadata } from 'next'

import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'
import { PageTitle } from '@/components/UI'

export const metadata: Metadata = {
	title: '404 Not Found (╯°□°）╯︵ ┻━┻',
	description: 'Out of all the pages you could have visited, you chose this one.',
}

export default function NotFound() {
	return (
		<SectionContainer>
			<div className="space-y-2 md:space-y-5">
				<div className="md:flex md:items-baseline md:justify-between">
					<PageTitle>404 Not Found (╯°□°）╯︵ ┻━┻</PageTitle>
				</div>
			</div>
			<div className="mt-4 grid grid-cols-1 items-center md:grid-cols-6 md:text-left">
				<div className="order-2 col-span-5 leading-tight md:order-1 md:leading-normal">
					<p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
						Sorry we couldn't find this page.
					</p>
					<p className="mb-8">
						But don't worry, you can find plenty of other things on our homepage.
					</p>
					<Link href="/">
						<button className="inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none">
							Back to homepage
						</button>
					</Link>
				</div>
			</div>
		</SectionContainer>
	)
}
