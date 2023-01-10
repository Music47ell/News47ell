import { useState } from 'react'

import { MenuIcon, News47ell, Slash, XIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

const Nav = () => {
	const [navShow, setNavShow] = useState(false)

	const onToggleNav = () => {
		setNavShow((status) => {
			return !status
		})
	}

	return (
		<nav className="bg-nfh-background-secondary print:hidden">
			<div className="mx-auto border-b border-nfh-accent-primary px-8 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<button
							className="inline-flex items-center justify-center hover:animate-wiggle"
							onClick={onToggleNav}
						>
							<span className="sr-only">Open main menu</span>
							{navShow ? (
								<XIcon className="block h-6 w-6 fill-nfh-accent-primary" />
							) : (
								<MenuIcon className="block h-6 w-6 fill-nfh-accent-primary" />
							)}
						</button>
					</div>
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
							{siteMetadata.headerNavLinks.map((item) => {
								return (
									<Link
										href={item.href}
										key={item.href}
										className="rounded-md py-2 px-3 text-sm font-medium hover:bg-nfh-background-primary hover:text-nfh-text-secondary"
									>
										{item.title}
									</Link>
								)
							})}
						</div>
					</div>
				</div>
			</div>

			<div className={navShow ? 'border-b border-nfh-accent-primary px-8 sm:hidden' : 'hidden'}>
				<nav className="my-4 grid text-left sm:hidden sm:grid-cols-2 sm:text-center">
					{siteMetadata.headerNavLinks.map((item) => {
						return (
							<Link
								href={item.href}
								key={item.href}
								className="py-2 text-sm font-medium"
								onClick={onToggleNav}
							>
								{item.title}
							</Link>
						)
					})}
				</nav>
			</div>
		</nav>
	)
}

export default Nav
