import { default as Link } from '@/components/Link'

const heading = ({ node, children }) => {
	const id = node.properties.id
	const level = node.tagName.slice(1)

	return (
		<>
			{level === '1' && (
				<h1 id={id} className="text-3xl font-bold">
					<Link href={`#${id}`}>#</Link> {children}
				</h1>
			)}
			{level === '2' && (
				<h2 id={id} className="text-2xl font-bold">
					<Link href={`#${id}`}>#</Link> {children}
				</h2>
			)}
			{level === '3' && (
				<h3 id={id} className="text-xl font-bold">
					<Link href={`#${id}`}>#</Link> {children}
				</h3>
			)}
			{level === '4' && (
				<h4 id={id} className="text-lg font-bold">
					<Link href={`#${id}`}>#</Link> {children}
				</h4>
			)}
			{level === '5' && (
				<h5 id={id} className="text-base font-bold">
					<Link href={`#${id}`}>#</Link> {children}
				</h5>
			)}
			{level === '6' && (
				<h6 id={id} className="text-sm font-bold">
					<Link href={`#${id}`}>#</Link> {children}
				</h6>
			)}
		</>
	)
}

export default heading
