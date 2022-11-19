import { LinkCard } from '@/components/blog'
import { default as Link } from '@/components/Link'

const P = ({ node, children }) => {
	if (node.children[0].tagName === 'img') {
		const image: any = node.children[0]
		const src = `https://res.cloudinary.com/music47ell/image/upload/news47ell${image.properties.src}`

		return (
			<>
				<div className="flex justify-center">
					<img src={src} alt={image.properties.alt} width="600" height="300" />
				</div>
				<span className="flex justify-center">
					<Link href={src}>View full res image</Link>
				</span>
			</>
		)
	}

	// if node has a children that match [@preview](link) then return a preview
	const child = node.children[0]

	if (child.tagName === 'a' && child.children[0].value === '@preview') {
		const url = child.properties.href as string

		return <LinkCard url={url} />
	}

	return <p>{children}</p>
}

export default P
