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
			<Link
				className="group/track tablet-sm:col-span-6 relative col-span-2 h-full !w-full truncate no-underline transition-colors"
				href={url}
			>
				<div className="mobile-md:max-h-[154.5px] tablet-sm:p-14 flex h-full w-full max-w-full flex-row items-center justify-between gap-1 truncate bg-[rgba(9,17,34,0.35)] p-2 backdrop-blur-lg backdrop-saturate-200">
					<div className="tablet-sm:gap-16 flex flex-col gap-12 truncate mix-blend-hard-light">
						<div className="flex flex-col">
							<p className="max-w-full truncate text-xs font-bold transition-colors">{title}</p>
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
