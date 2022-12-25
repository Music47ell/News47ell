import { HTMLAttributes } from 'react'

import { default as Link } from '@/components/Link'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Heading = ({ as, id, children }: HeadingProps) => {
	switch (as) {
		case 'h1':
			return (
				<h1 id={id} className="text-2xl font-bold">
					<Link href={`#${id}`} className="mr-2">
						#
					</Link>
					{children}
				</h1>
			)
		case 'h2':
			return (
				<h2 id={id} className="text-2xl font-bold">
					<Link href={`#${id}`} className="mr-2">
						#
					</Link>
					{children}
				</h2>
			)
		case 'h3':
			return (
				<h3 id={id} className="text-2xl font-bold">
					<Link href={`#${id}`} className="mr-2">
						#
					</Link>
					{children}
				</h3>
			)
		case 'h4':
			return (
				<h4 id={id} className="text-2xl font-bold">
					<Link href={`#${id}`} className="mr-2">
						#
					</Link>
					{children}
				</h4>
			)
		case 'h5':
			return (
				<h5 id={id} className="text-2xl font-bold">
					<Link href={`#${id}`} className="mr-2">
						#
					</Link>
					{children}
				</h5>
			)
		case 'h6':
			return (
				<h6 id={id} className="text-2xl font-bold">
					<Link href={`#${id}`} className="mr-2">
						#
					</Link>
					{children}
				</h6>
			)
	}
}

export default Heading
