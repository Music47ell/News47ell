/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import pkg from 'github-slugger'
const { slug } = pkg

type headingType = {
	id: string
	type: 'heading_2' | 'heading_3'
	text: string
	children: headingType[]
}

const BlogToc = ({ blocks }: { blocks: any }) => {
	const headings = blocks
		.filter((b: any) => b.type === 'heading_2' || b.type === 'heading_3')
		.map((b: any) => {
			return { id: b.id, type: b.type, text: b[b.type].text[0].plain_text, children: [] }
		})

	if (headings.length === 0) {
		return (
			<aside className="col-span-3 hidden w-full space-y-8 md:sticky md:top-12 md:self-start lg:inline-block">
				<div className="rounded border border-gray-600 p-4">
					<h1 className="font-bold leading-8 text-nfh-text-primary">Table of contents</h1>
					<p className="leading-6 text-nfh-text-secondary">
						There is no table of contents. Here is a cookie. 🍪
					</p>
				</div>
			</aside>
		)
	}

	const nestedHeadings: headingType[] = []
	headings.forEach((h: headingType) => {
		if (h.type === 'heading_2') {
			nestedHeadings.push(h)
		} else if (h.type === 'heading_3' && nestedHeadings.length > 0) {
			nestedHeadings[nestedHeadings.length - 1].children.push(h)
		}
	})

	return (
		<aside className="col-span-3 hidden w-full space-y-8 md:sticky md:top-12 md:self-start lg:inline-block">
			<div className="rounded border border-gray-600 p-4">
				<h1 className="font-bold leading-8 text-nfh-text-primary">Table of contents</h1>
				<ul className="list-inside list-disc">
					{nestedHeadings.map((h: headingType) => (
						<Link href={`#${slug(h.text)}`} key={h.id} passHref>
							<li>
								<a href={`#${slug(h.text)}`}>{h.text}</a>
								{h.children.length > 0 && (
									<ul className="ml-6 list-inside list-disc">
										{h.children.map(
											(h: { id: string; type: 'heading_2' | 'heading_3'; text: string }) => (
												<Link href={`#${slug(h.text)}`} key={h.id} passHref>
													<li>
														<a href={`#${slug(h.text)}`}>{h.text}</a>
													</li>
												</Link>
											)
										)}
									</ul>
								)}
							</li>
						</Link>
					))}
				</ul>
			</div>
		</aside>
	)
}

export default BlogToc
