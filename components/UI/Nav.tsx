import { useState } from 'react'

import { News47ell, Slash } from '@/components/icons'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

const Nav = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<nav className="border-b border-nfh-accent-primary bg-nfh-background-secondary print:hidden">
			<div className="mx-auto max-w-6xl px-4">
				<div className="flex justify-between">
					<div className="flex space-x-4">
						{/* logo */}
						<div className="relative flex h-16 items-center justify-between">
							<a href="/" aria-label={siteMetadata.headerTitle}>
								<Slash className="m-auto block h-10 w-auto md:hidden" />
								<News47ell className="m-auto hidden h-10 w-auto md:block" />
							</a>
						</div>
						<div className="hidden items-center space-x-1 md:flex">
							{siteMetadata.heroCardLinks.map((link, index) => (
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

					<div className="flex items-center space-x-1">
						{siteMetadata.headerNavLinks.map((link, index) => (
							<Link
								key={index}
								href={link.href}
								className="px-1 py-5 text-sm hover:bg-nfh-background-primary"
							>
								{link.title}
							</Link>
						))}
					</div>

					{/* mobile button goes here */}
					<div className="flex items-center md:hidden">
						<button onClick={() => setIsOpen(!isOpen)}>
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* mobile menu */}
			<div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
				{siteMetadata.headerNavLinks.map((link, index) => (
					<Link
						key={index}
						href={link.href}
						className="block px-4 py-2 text-sm hover:bg-nfh-background-primary"
					>
						{link.title}
					</Link>
				))}
			</div>
		</nav>
	)
}

export default Nav
