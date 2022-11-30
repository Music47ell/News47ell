import { Divider } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'
import random from '@/utils/random'
import shuffle from '@/utils/shuffle'

import InfiniteLoopSlider from './InfiniteLoopSlider'

export default function TopicsMarquee() {
	return (
		<section>
			<Divider>Topics I Enjoy</Divider>
			<div className="relative flex w-full shrink-0 flex-col justify-center gap-y-4 gap-x-0 overflow-hidden px-0">
				<InfiniteLoopSlider duration={random(15000 - 5000, 15000 + 5000)} direction="normal">
					{shuffle(siteMetadata.marqueeLists.topics).map((topic) => (
						<div
							key={topic}
							className="mr-4 flex items-center gap-y-0 gap-x-1 whitespace-nowrap rounded-lg border
							border-nfh-accent-primary bg-nfh-background-secondary py-3 px-4 text-nfh-text-primary"
						>
							<span>#</span> {topic}
						</div>
					))}
				</InfiniteLoopSlider>
			</div>
		</section>
	)
}
