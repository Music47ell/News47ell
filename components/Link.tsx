import type { Route } from 'next'
import Link from 'next/link'

import siteMetadata from '@/data/siteMetadata'
import { Links } from '@/lib/types'

const CustomLink = ({ className, href, rel, children, ...rest }: Links) => {
	const isInternalLink = href && href.startsWith('/')
	const isAnchorLink = href && href.startsWith('#')
	const isAffiliateLink = href && href.startsWith('$')

	const style = `${
		className ? className : ''
	} text-nfh-accent-primary hover:text-nfh-accent-secondary`.replace(/^\s+/, '')

	if (isInternalLink) {
		return (
			<Link href={href as Route} className={style} {...rest}>
				{children}
			</Link>
		)
	}

	if (isAnchorLink) {
		return (
			<a aria-hidden="true" tabIndex={-1} className={style} href={href} {...rest}>
				{children}
			</a>
		)
	}

	if (isAffiliateLink) {
		const keyword = children?.toString() // Get the title from the children
		const affiliateLink = Object.values(siteMetadata.affiliateLinks).find(
			(link) => link.title.toLowerCase() === keyword?.toLowerCase()
		)?.href

		if (affiliateLink) {
			return (
				<a href={affiliateLink} className={style} {...rest}>
					{children}
				</a>
			)
		}
	}

	return (
		<a
			href={`${href}?ref=${siteMetadata.siteUrl.replace(/(https?:\/\/)?(www\.)?/, '')}`}
			className={style}
			{...rest}
		>
			{children}
		</a>
	)
}

export default CustomLink
