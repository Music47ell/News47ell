import { DynamicToolsMarquee, DynamicTopicsMarquee } from '@/components/Dynamic'
import { HeroCard, HeroCardLinks, TopReactions, TopViews } from '@/components/home'

// Marquee source: https://codepen.io/ykadosh/pen/KKezJzz

export default function HomeLayout() {
	return (
		<main className="container my-28 mx-auto mb-8 flex max-w-5xl flex-1 flex-col space-y-2 px-3 md:space-y-5">
			<HeroCard />
			<HeroCardLinks />
			<DynamicToolsMarquee />
			<DynamicTopicsMarquee />
			<TopReactions />
			<TopViews />
		</main>
	)
}
