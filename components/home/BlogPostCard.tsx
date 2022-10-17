import { default as Link } from '@/components/Link'
import { useSFX } from '@/hooks/useSFX'
import { BorderEffect } from '@/components/UI'

export default function BlogPostCard({ title, slug, total }) {
	const { playMouseClick } = useSFX()
	return (
		<Link
			href={slug}
			className={`w-full rounded-xl md:w-1/3`}
			//@ts-ignore
			onClick={playMouseClick}
		>
			<div className="group flex h-full flex-col justify-between rounded-lg bg-nfh-background-secondary p-4 transition duration-500 hover:scale-100 hover:shadow-lg hover:shadow-nfh-accent-primary">
				<BorderEffect />
				<div className="flex flex-col justify-between md:flex-row">
					<h4 className="w-full text-base font-medium tracking-tight text-nfh-text-primary">
						{title}
					</h4>
					<span className="ml-2 align-baseline">
						{total ? new Number(total).toLocaleString() : '---'}
					</span>
				</div>
			</div>
		</Link>
	)
}
