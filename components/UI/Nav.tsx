import { News47ell, Slash } from '@/components/icons'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

const Nav = () => {
	return (
		<nav className="border-b border-nfh-accent-primary bg-nfh-background-secondary print:hidden">
			<div className="mx-auto max-w-6xl px-4">
				<div className="flex justify-between">
					<div className="flex space-x-4">
						{/* logo */}
						<div className="relative flex h-16 items-center justify-between">
							<a href="/" aria-label={siteMetadata.title}>
								<Slash className="m-auto block h-10 w-auto md:hidden" />
								<News47ell className="m-auto hidden h-10 w-auto md:block" />
							</a>
						</div>
					</div>

					<div className="flex items-center space-x-1">
						{siteMetadata.headerNavLinks.map((link, index) => (
							<Link
								key={index}
								href={link.href}
								className="px-1 py-5 hover:bg-nfh-background-primary"
							>
								{link.title}
							</Link>
						))}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Nav
