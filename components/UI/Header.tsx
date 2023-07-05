'use client'

import { usePathname } from 'next/navigation'

import { News47ell, Slash } from '@/components/icons'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function Header() {
	const pathname = usePathname()

	return (
		<header className="sticky inset-x-0 top-0 z-20 m-auto flex w-full flex-row items-center justify-between bg-nfh-background-primary/30 p-4 backdrop-blur-lg sm:min-h-[74px]">
			<a href="/" aria-label={siteMetadata.title}>
				<Slash className="m-auto block h-10 w-auto md:hidden" />
				<News47ell className="m-auto hidden h-10 w-auto md:block" />
			</a>

			<nav className="flex flex-row flex-wrap items-center gap-4 [&:not(:hover)>a]:opacity-100 [&>a]:transition-opacity">
				<div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-gray-400/0 via-gray-500 to-gray-400/0" />
				<>
					{siteMetadata.headerNavLinks.map((link, index) => (
						<Link
							key={index}
							href={link.href}
							className={`relative rounded-sm p-2 text-base font-medium leading-none hover:bg-nfh-background-secondary sm:text-lg [&:not(:hover)]:opacity-50 ${
								!!pathname && link.activePath.test(pathname)
									? 'cursor-not-allowed bg-nfh-background-secondary text-nfh-accent-secondary'
									: 'bg-transparent'
							}`}
						>
							<link.icon className="h-6 w-6 fill-current text-nfh-accent-primary group-hover:text-nfh-text-secondary" />
						</Link>
					))}
				</>
			</nav>
		</header>
	)
}
