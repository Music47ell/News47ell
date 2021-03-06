/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

const CustomLink = ({
  href,
  ...rest
}: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>): JSX.Element => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')
  const style = 'u-url text-primary hover:text-muted-hover'

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a className={style} {...rest} />
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a className={style} href={href} {...rest} />
  }

  return <a className={style} target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink
