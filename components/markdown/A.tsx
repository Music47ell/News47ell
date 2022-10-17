import { default as Link } from '@/components/Link'
//import { LinkCard } from '@/components/blog'

const A = ({ node, children }) => {
	const { href } = node.properties

	return <Link href={href}>{children}</Link>
}

export default A
