import { HeroCard, HeroCardLinks, TopReactions, TopViews } from '@/components/home'
import { SectionContainer } from '@/components/UI'

// Marquee source: https://codepen.io/ykadosh/pen/KKezJzz

export default function HomeLayout() {
	return (
		<SectionContainer>
			<HeroCard />
			<HeroCardLinks />
			<TopReactions />
			<TopViews />
		</SectionContainer>
	)
}
