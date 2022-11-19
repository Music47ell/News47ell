import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'

import {
	ArchiveIcon,
	CalendarIcon,
	CategoryIcon,
	DashboardIcon,
	MenuIcon,
	NewsIcon,
	PaintRollIcon,
	SearchIcon,
	TagIcon,
	ToolIcon,
	XIcon,
} from '@/components/icons'
import { News47ell, Slash } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import AudioToggle from '@/components/toggles/AudioToggle'
import siteMetadata from '@/data/siteMetadata'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useSFX } from '@/hooks/useSFX'
import { getGravatar } from '@/utils/getGravatar'

const Nav = ({ pickerOpen, setPickerOpen }) => {
	const [firstName, setFirstName] = useState<string | null>(null)
	const [navShow, setNavShow] = useState(false)
	const [userNavShow, setUserNavShow] = useState(false)
	const { user } = useUser()
	const ref = useClickOutside(() => setUserNavShow(false))
	const { playPopEnter } = useSFX()

	const handleOnEnter = () => playPopEnter({ playbackRate: 1.5 })

	const icons = [
		NewsIcon,
		DashboardIcon,
		CategoryIcon,
		TagIcon,
		ArchiveIcon,
		ToolIcon,
		CalendarIcon,
	]

	const onToggleNav = () => {
		setNavShow((status) => {
			return !status
		})
	}

	const onToggleUserNav = () => {
		setUserNavShow((status) => {
			return !status
		})
	}

	const onClickUserNavLink = () => {
		setUserNavShow(false)
		setNavShow(false)
	}

	useEffect(() => {
		async function getProfile() {
			try {
				if (!user) {
					return
				}
				const { data, error, status } = await supabaseClient
					.from('profiles')
					.select('id, first_name')
					.eq('id', user.id)
					.single()

				if (error && status !== 406) {
					throw error
				}

				if (data) {
					setFirstName(data.first_name)
				}
			} catch (error) {
				alert(error.message)
			}
		}
		if (user) getProfile()
	}, [user])

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
						<span className="sr-only">Toggle Search</span>
						<Link href="/blog/search" onMouseEnter={handleOnEnter}>
							<SearchIcon className="block h-6 w-6 fill-nfh-accent-primary hover:animate-wiggle" />
						</Link>
					</div>
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
					{user && (
						<div className="relative ml-3">
							<div>
								<button
									className="flex rounded-full text-sm hover:animate-wiggle focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
									onMouseEnter={handleOnEnter}
									onClick={onToggleUserNav}
								>
									<span className="sr-only">Open user menu</span>
									<Image
										src={getGravatar(user?.email, 32)}
										width={32}
										height={32}
										className="rounded-full"
										alt="Profile Photo"
									/>
								</button>
							</div>
							<ul
								ref={ref}
								className={
									userNavShow
										? 'absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-nfh-background-secondary py-1 shadow-lg ring-1 ring-black/5 focus:outline-none'
										: 'hidden '
								}
							>
								<div className="flex items-center justify-between py-2 px-4">
									<p className="text-sm font-medium">Welcome back {user ? firstName : 'Guest'}</p>
								</div>
								{user &&
									siteMetadata.adminNavLinks.map((item, index) => {
										return (
											<li key={index}>
												<Link
													href={item.href}
													onMouseEnter={handleOnEnter}
													onClick={onClickUserNavLink}
												>
													<span className="block py-2 px-4 text-sm hover:bg-nfh-accent-primary hover:text-nfh-text-primary">
														{item.title}
													</span>
												</Link>
											</li>
										)
									})}
							</ul>
						</div>
					)}
				</div>
			</div>

			<div className={navShow ? 'block border-y border-nfh-accent-primary' : 'hidden'}>
				<nav className="my-4 grid gap-2 text-left sm:block sm:grid-cols-2 sm:text-center">
					{siteMetadata.headerNavLinks.map((item, idx) => {
						const Icon = icons[idx]
						return (
							<Link
								href={item.href}
								key={item.href}
								className="rounded-md py-2 px-3 text-sm font-medium text-nfh-text-primary hover:bg-nfh-background-primary hover:text-nfh-text-secondary"
								onMouseEnter={handleOnEnter}
								onClick={onToggleNav}
							>
								<Icon className="mr-1 inline-block h-6 w-6 fill-nfh-accent-primary align-middle" />
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
