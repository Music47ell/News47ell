import {
	HeroCard,
	HeroCardLinks,
	ToolsMarquee,
	TopicsMarquee,
	TopReactions,
	TopViews,
} from '@/components/home'

// Marquee source: https://codepen.io/ykadosh/pen/KKezJzz

export default function HomeLayout(): JSX.Element {
	return (
		<main className="container mx-auto mb-8 flex max-w-5xl flex-1 flex-col space-y-2 px-3 md:space-y-5">
			<HeroCard />
			<HeroCardLinks />
			<ToolsMarquee />
			<TopicsMarquee />
			<TopReactions />
			<TopViews />
		</main>
	)
}
