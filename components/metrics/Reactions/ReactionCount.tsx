import { LikeIcon } from '@/components/icons'
import { DislikeIcon } from '@/components/icons'

export default function ReactionCount({ Count, Like = false, Dislike = false }) {
	return (
		<div className="flex items-center rounded-lg text-center">
			<h2 className="m-0 text-3xl font-bold">{Count}</h2>
			<p className="ml-4 inline h-10 w-10">
				{Like && <LikeIcon className="block h-10 w-10 fill-nfh-accent-primary" />}
				{Dislike && <DislikeIcon className="block h-10 w-10 fill-nfh-accent-primary" />}
			</p>
		</div>
	)
}
