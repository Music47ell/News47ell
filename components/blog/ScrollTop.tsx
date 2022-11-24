import { useEffect, useState } from 'react'

import { ArrowUpIcon } from '@/components/icons'

const ScrollTop = () => {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const handleWindowScroll = () => {
			if (window.scrollY > 50) setShow(true)
			else setShow(false)
		}

		window.addEventListener('scroll', handleWindowScroll)
		return () => window.removeEventListener('scroll', handleWindowScroll)
	}, [])

	const handleScrollTop = () => {
		window.scrollTo({ top: 0 })
	}
	return (
		<div
			className={`fixed right-8 bottom-8 hidden flex-col gap-3 ${show ? 'md:flex' : 'md:hidden'}`}
		>
			<button
				aria-label="Scroll To Top"
				onClick={handleScrollTop}
				className="rounded border border-nfh-accent-primary bg-nfh-background-secondary fill-nfh-accent-primary p-2 transition-all hover:border-nfh-accent-secondary hover:bg-nfh-background-secondary/50 hover:fill-nfh-accent-secondary"
			>
				<ArrowUpIcon className="h-5 w-5" />
			</button>
		</div>
	)
}

export default ScrollTop
