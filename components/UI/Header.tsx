'use client'

import { usePathname } from 'next/navigation'

import { News47ell, Slash } from '@/components/icons'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function Header() {
	const pathname = usePathname()

	return (
		<header className="container m-auto flex w-full max-w-3xl flex-row items-center justify-between gap-8 p-4 sm:min-h-[74px]">
			<a href="/" aria-label={siteMetadata.title}>
				<Slash className="m-auto block h-10 w-auto md:hidden" />
				<News47ell className="m-auto hidden h-10 w-auto md:block" />
			</a>

			<nav className="flex flex-row flex-wrap items-center gap-4">
				{siteMetadata.headerNavLinks.map((link, index) => (
					<Link
						key={index}
						href={link.href}
						className="font-sora relative text-base font-medium leading-none hover:bg-nfh-background-primary sm:text-lg"
					>
						{!!pathname && link.activePath.test(pathname) && (
							<span className="absolute inset-0 z-10 border-b border-nfh-accent-primary" />
						)}

						{link.title}
					</Link>
				))}
			</nav>
		</header>
	)
}
