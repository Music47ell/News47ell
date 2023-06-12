'use client'

import siteMetadata from 'data/siteMetadata'
import React, { useEffect, useState } from 'react'

import { XIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'

const SponsorPopover = () => {
	const [viewed, setViewed] = useState(true)

	useEffect(() => {
		const storedValue = localStorage.getItem('sponsor-popup-viewed')
		setViewed(Boolean(storedValue) || false)
	}, [])

	const dismissMessage = () => {
		localStorage.setItem('sponsor-popup-viewed', 'true')
		setViewed(true)
	}

	return (
		<div>
			{!viewed && (
				<div className="fixed inset-x-0 bottom-4 z-20 mx-auto w-11/12 select-none space-y-1 p-4 shadow-md ring-1 ring-white/20 backdrop-blur-md lg:left-4 lg:mx-0 lg:w-1/4">
					<div className="flex items-center justify-between gap-2">
						<Link href={siteMetadata.githubSponsorUrl} onClick={dismissMessage}>
							<h3 className="font-medium leading-tight">💖 Sponsor me via GitHub Sponsors!</h3>
						</Link>

						<button
							className="group rounded-full bg-white/10 p-1 transition-colors hover:bg-white/20"
							onClick={dismissMessage}
						>
							<XIcon className="h-4 w-4 fill-current text-nfh-accent-primary group-hover:text-nfh-text-secondary" />
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default SponsorPopover
