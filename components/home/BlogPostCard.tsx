import { default as Link } from '@/components/Link'
import { BorderEffect } from '@/components/UI'
import { useSFX } from '@/hooks/useSFX'

export default function BlogPostCard({ title, slug, total }) {
	const { playMouseClick } = useSFX()
	return (
		<Link
			href={slug}
			className="group relative w-full cursor-pointer bg-nfh-background-secondary p-4 transition duration-500 hover:scale-105 hover:shadow-lg hover:shadow-nfh-accent-primary"
			//@ts-ignore
			onClick={playMouseClick}
		>
			<BorderEffect />
			<div className="flex flex-col justify-between md:flex-row">
				<h4 className="w-full text-base font-medium tracking-tight text-nfh-text-primary">
					{title}
				</h4>
				<span className="ml-2 align-baseline">
					{total ? new Number(total).toLocaleString() : '---'}
				</span>
			</div>
		</Link>
	)
}
