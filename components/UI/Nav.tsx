import { useState } from 'react'

import { MenuIcon, PaintRollIcon, XIcon } from '@/components/icons'
import { News47ell, Slash } from '@/components/icons'
import { default as Link } from '@/components/Link'
import AudioToggle from '@/components/toggles/AudioToggle'
import siteMetadata from '@/data/siteMetadata'
import { useSFX } from '@/hooks/useSFX'

const Nav = ({ pickerOpen, setPickerOpen }) => {
	const [navShow, setNavShow] = useState(false)
	const { playPopEnter } = useSFX()

	const handleOnEnter = () => playPopEnter({ playbackRate: 1.5 })

	const onToggleNav = () => {
		setNavShow((status) => {
			return !status
		})
	}

	return (
		<nav className="bg-nfh-background-secondary print:hidden">
			<div className="relative flex h-16 items-center justify-between">
				<div className="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-8">
					<button
						className="inline-flex items-center justify-center hover:animate-wiggle"
						onMouseEnter={handleOnEnter}
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
				<div className="m-auto items-center justify-center">
					<Link href="/" aria-label={siteMetadata.headerTitle}>
						<News47ell className="m-auto hidden h-10 w-auto lg:block" />
						<Slash className="m-auto block h-10 w-auto lg:hidden" />
					</Link>
				</div>
				<div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-8">
					<div className="relative ml-3">
						<span className="sr-only">Toggle SFX</span>
						<AudioToggle />
					</div>
					<div className="relative ml-3">
						<span className="sr-only">Toggle Theme</span>
						<button
							aria-label="toggle theme picker"
							onMouseEnter={handleOnEnter}
							onClick={() => setPickerOpen(!pickerOpen)}
							className="h-8 hover:animate-wiggle"
						>
							<PaintRollIcon className="block h-6 w-6 fill-nfh-accent-primary" />
						</button>
					</div>
				</div>
			</div>

			<div className={navShow ? 'block border-y border-nfh-accent-primary' : 'hidden'}>
				<nav className="my-4 grid gap-2 text-left sm:block sm:grid-cols-2 sm:text-center">
					{siteMetadata.headerNavLinks.map((item) => {
						return (
							<Link
								href={item.href}
								key={item.href}
								className="rounded-md py-2 px-3 text-sm font-medium text-nfh-text-primary hover:bg-nfh-background-primary hover:text-nfh-text-secondary"
								onMouseEnter={handleOnEnter}
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
