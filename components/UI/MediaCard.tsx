import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'

type MediaCardProps = {
	title: string
	image: string
	url: string
}

export default function MediaCard({ title, image, url }: MediaCardProps) {
	return (
		<div className="flex flex-col">
			<Link className="relative col-span-2 h-full !w-full truncate no-underline" href={url}>
				<div className="flex h-full w-full max-w-full flex-row items-center justify-between gap-1 truncate bg-nfh-accent-secondary/50 p-2">
					<div className="flex flex-col gap-12 truncate">
						<div className="flex flex-col">
							<p className="max-w-full truncate text-xs font-bold">{title}</p>
						</div>
					</div>
					<Image
						className="block h-auto max-h-full w-auto max-w-full"
						draggable={false}
						width={100}
						height={100}
						title={title}
						alt={title}
						src={image}
					/>
				</div>
			</Link>
		</div>
	)
}
