import { HeroCard, HeroCardLinks, TopViews } from '@/components/home'
import { SectionContainer } from '@/components/UI'

// Marquee source: https://codepen.io/ykadosh/pen/KKezJzz

export default function HomeLayout() {
	return (
		<SectionContainer className="mb-8">
			<HeroCard />
			<HeroCardLinks />
			<TopViews />
		</SectionContainer>
	)
}
