'use client'

import { News47ell } from '@/components/icons'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function Header() {
	return (
		<header className="m-auto w-full p-4">
			<Link href="/" aria-label={siteMetadata.title}>
				<News47ell className="m-auto block h-10 w-auto" />
			</Link>
		</header>
	)
}
