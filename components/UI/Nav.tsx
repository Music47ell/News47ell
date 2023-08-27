'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from 'react'

import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

import { PlusIcon } from '../icons'

export default function Nav() {
	const [expanded, setExpanded] = useState(false)
	const ref = useRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>()

	const handleClick = () => {
		setExpanded(!expanded)
	}

	const itemVariants = {
		hidden: { opacity: 0, rotate: -360, scale: 0, x: -50 },
		visible: (i: number) => ({
			opacity: 1,
			rotate: 0,
			scale: 1,
			transition: {
				bounce: 0.5,
				damping: 10,
				delay: i * 0.05,
				type: 'spring',
			},
			x: 0,
		}),
	}

	useEffect(() => {
		if (!expanded) return

		const handleOutsideClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			if ((ref.current as any)?.contains(target)) return

			setExpanded(false)
		}

		const scrolled = () => {
			setExpanded(false)
		}

		window.addEventListener('click', handleOutsideClick, { passive: true })
		window.addEventListener('scroll', scrolled, { passive: true })

		return () => {
			window.removeEventListener('click', handleOutsideClick)
			window.removeEventListener('scroll', scrolled)
		}
	}, [expanded])

	useEffect(() => {
		const handler = (event: { key: string; metaKey: boolean; preventDefault: () => void }) => {
			if (event.key === 'ArrowLeft' && expanded) {
				event.preventDefault()
			} else if (event.key === 'ArrowDown' && expanded) {
				event.preventDefault()
			} else if (event.key === 'Enter' && expanded) {
				// highlightedTab?.click();
			} else if (event.key === 'k' && event.metaKey) {
				event.preventDefault()
				setExpanded(!expanded)
			} else if (event.key === 'Escape') {
				setExpanded(false)
			}
		}

		window.addEventListener('keydown', handler)

		return () => {
			window.removeEventListener('keydown', handler)
		}
	})

	return (
		<nav className="fixed bottom-4 left-2 z-50 sm:left-4 md:left-6">
			<div className="flex items-center" ref={ref as any}>
				<motion.button
					animate={{ rotate: expanded ? 45 : 0 }}
					aria-label="Navigation Menu"
					className="flex select-none items-center justify-center rounded-full bg-white p-3"
					onClick={handleClick}
					whileTap={{ scale: 1.1 }}
				>
					<PlusIcon className="h-6 w-6 text-nfh-accent-primary" />
				</motion.button>
				<AnimatePresence>
					{expanded && (
						<motion.div className="flex">
							{siteMetadata.headerNavLinks.map((link, index) => (
								<motion.div
									animate="visible"
									className="mx-0.5"
									custom={index}
									exit="hidden"
									initial="hidden"
									key={index}
									style={{
										WebkitTapHighlightColor: 'transparent',
									}}
									tabIndex={-1}
									transition={{ bounce: 0.5, damping: 10, type: 'spring' }}
									variants={itemVariants}
									whileTap={{
										scale: 1.1,
										transition: {
											duration: 0.4,
											ease: [0.25, 1, 0.5, 1],
											type: 'tween',
										},
									}}
								>
									<Link
										className="flex cursor-pointer select-none flex-col items-center space-y-1 rounded-full bg-black p-3 transition-all duration-200"
										href={link.href}
										key={index}
										tabIndex={0}
									>
										<link.icon className="h-6 w-6 fill-current text-nfh-accent-secondary" />
									</Link>
								</motion.div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</nav>
	)
}
