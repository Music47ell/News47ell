'use client'

import { News47ell } from '@/components/icons'
import siteMetadata from '@/data/siteMetadata'

export default function Header() {
	return (
		<header className="sticky inset-x-0 top-0 z-20 m-auto w-full bg-nfh-background-primary/30 p-4 backdrop-blur-lg sm:min-h-[74px]">
			<a href="/" aria-label={siteMetadata.title}>
				<News47ell className="m-auto block h-10 w-auto" />
			</a>
		</header>
	)
}
