import { default as Link } from '@/components/Link'
import { Divider } from '@/components/UI'
import { BorderEffect } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'

export default function HeroCardLinks() {
	return (
		<section>
			<Divider>/</Divider>
			<div className="grid gap-4 md:grid-cols-2">
				{siteMetadata.heroCardLinks.map((link, index) => (
					<Link
						key={index}
						href={link.href}
						className="group relative w-full cursor-pointer bg-nfh-background-secondary/50 p-4 transition duration-500 hover:bg-nfh-background-secondary"
					>
						<BorderEffect />
						{link.title}
					</Link>
				))}
			</div>
		</section>
	)
}
