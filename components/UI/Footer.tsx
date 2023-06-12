import HCard from '@/components/hCard'
import { default as Link } from '@/components/Link'
import { NowPlaying } from '@/components/metrics/Spotify'
import { NowWatching } from '@/components/metrics/Trakt'
import siteMetadata from '@/data/siteMetadata'

import SponsorPopover from './SponsorPopover'

export default function Footer(): JSX.Element {
	return (
		<footer className="z-40 border-t border-nfh-accent-primary bg-nfh-background-secondary p-4 print:hidden">
			<div className="flex flex-col items-center">
				<div className="grid grid-cols-1 space-y-2">
					<div className="flex items-center justify-between space-x-3">
						{siteMetadata.author.social.map((link, index) => (
							<Link key={index} href={link.href}>
								{link.title}
							</Link>
						))}
					</div>
					<SponsorPopover />
					<NowPlaying />
					<NowWatching />
					<HCard />
					<div className="copyright text-center text-xs" itemProp="copyrightYear">
						COPYRIGHT © 2013 / <span className="year">{new Date().getFullYear()}</span>{' '}
						{siteMetadata.altTitle}. ALL RIGHTS RESERVED.
					</div>
					<div className="text-center">
						<Link href="https://xn--sr8hvo.ws/%F0%9F%9B%81%F0%9F%9A%BC%F0%9F%A6%83/previous">
							←
						</Link>
						An IndieWeb Webring 🕸💍
						<Link href="https://xn--sr8hvo.ws/%F0%9F%9B%81%F0%9F%9A%BC%F0%9F%A6%83/next">→</Link>
						<p className="text-xs">
							Have a good {new Date().toLocaleString('default', { weekday: 'long' })}!
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
