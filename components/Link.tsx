import type { Route } from 'next'
import Link from 'next/link'

import { Links } from '@/lib/types'

const CustomLink = ({ className, href, rel, ...rest }: Links) => {
	const isInternalLink = href && href.startsWith('/')
	const isAnchorLink = href && href.startsWith('#')
	const style = `${
		className ? className : ''
	} text-nfh-accent-primary hover:text-nfh-text-secondary`.replace(/^\s+/, '')

	if (isInternalLink) {
		return <Link href={href as Route} className={style} {...rest} />
	}

	if (isAnchorLink) {
		return <a aria-hidden="true" tabIndex={-1} className={style} href={href} {...rest} />
	}

	return (
		<a className={style} target="_blank" rel={`noopener noreferrer ${rel}`} href={href} {...rest} />
	)
}

export default CustomLink
