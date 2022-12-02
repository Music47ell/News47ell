import {
	CloudflareIcon,
	CommitlintIcon,
	CSSIcon,
	ESlintIcon,
	FigmaIcon,
	GitHubIcon,
	GitIcon,
	GitIgnoreIcon,
	GoogleChromeIcon,
	HTMLIcon,
	JavaScriptIcon,
	JSONIcon,
	MDXIcon,
	NextDotJsIcon,
	NodeDotJsIcon,
	NPMIcon,
	PlanetScaleIcon,
	PNPMIcon,
	PostmanIcon,
	PreCommitIcon,
	PrettierIcon,
	PrismaIcon,
	ReactIcon,
	SupabaseIcon,
	SVGIcon,
	TailwindCSSIcon,
	TypeScriptIcon,
	VercelIcon,
	VisualStudioCodeIcon,
} from '@/components/icons'
import { Divider } from '@/components/UI'
import random from '@/utils/random'
import shuffle from '@/utils/shuffle'

import InfiniteLoopSlider from './InfiniteLoopSlider'

export default function ToolsMarquee() {
	const TOOLS = [
		CloudflareIcon,
		CommitlintIcon,
		CSSIcon,
		ESlintIcon,
		FigmaIcon,
		GitIgnoreIcon,
		GitIcon,
		GitHubIcon,
		GoogleChromeIcon,
		HTMLIcon,
		JavaScriptIcon,
		JSONIcon,
		MDXIcon,
		NextDotJsIcon,
		NodeDotJsIcon,
		NPMIcon,
		PlanetScaleIcon,
		PNPMIcon,
		PostmanIcon,
		PreCommitIcon,
		PrettierIcon,
		PrismaIcon,
		ReactIcon,
		SupabaseIcon,
		SVGIcon,
		TailwindCSSIcon,
		TypeScriptIcon,
		VercelIcon,
		VisualStudioCodeIcon,
	]
	return (
		<section>
			<Divider>Tools I use</Divider>
			<div className="relative flex w-full shrink-0 flex-col justify-center gap-y-4 gap-x-0 overflow-hidden px-0">
				<InfiniteLoopSlider duration={random(15000 - 5000, 15000 + 5000)} direction="reverse">
					{shuffle(TOOLS).map((Tool, index) => (
						<Tool
							key={index}
							className="mr-4 flex h-20 w-20 items-center gap-y-0 gap-x-1 rounded-lg border border-nfh-accent-primary bg-nfh-background-secondary py-3 px-4"
						/>
					))}
				</InfiniteLoopSlider>
			</div>
		</section>
	)
}
