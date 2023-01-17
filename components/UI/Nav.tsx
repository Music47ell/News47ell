import { useKBar } from 'kbar'

import { CommandIcon, News47ell, Slash } from '@/components/icons'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

const Nav = () => {
	const { query } = useKBar()

	return (
		<nav className="bg-nfh-background-secondary print:hidden">
			<div className="mx-auto border-b border-nfh-accent-primary px-8 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex shrink-0 items-center">
							<Link href="/" aria-label={siteMetadata.headerTitle}>
								<News47ell className="m-auto hidden h-10 w-auto lg:block" />
								<Slash className="m-auto block h-10 w-auto lg:hidden" />
							</Link>
						</div>
					</div>
					<div className="hidden sm:ml-6 sm:block">
						<div className="flex space-x-4">
							<button
								aria-label="Toggle Command Palette"
								type="button"
								className="flex h-9 w-9 items-center justify-center rounded-lg bg-nfh-background-primary ring-nfh-accent-primary transition-all hover:ring-2"
								onClick={query.toggle}
							>
								<CommandIcon className="h-6 w-6 text-nfh-accent-primary" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Nav
