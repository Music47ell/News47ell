import HCard from '@/components/hCard'
import { default as Link } from '@/components/Link'
import { NowPlaying } from '@/components/metrics/Spotify'
import { NowWatching } from '@/components/metrics/Trakt'
import siteMetadata from '@/data/siteMetadata'

export default function Footer(): JSX.Element {
	return (
		<footer className="border-t border-nfh-accent-primary bg-nfh-background-secondary py-4 print:hidden">
			<div className="flex flex-col items-center">
				<div className="grid grid-cols-1 space-y-2">
					<div className="copyright text-center text-xs" itemProp="copyrightYear">
						COPYRIGHT © 2013 / <span className="year">{new Date().getFullYear()}</span>
						{siteMetadata.altTitle}. ALL RIGHTS RESERVED.
					</div>
					<div className="text-center text-xs">
						Have a good {new Date().toLocaleString('default', { weekday: 'long' })}!
					</div>
					<NowPlaying />
					<NowWatching />
					<HCard />
					<div className="text-center">
						<Link href="https://xn--sr8hvo.ws/%F0%9F%9B%81%F0%9F%9A%BC%F0%9F%A6%83/previous">
							←
						</Link>
						An IndieWeb Webring 🕸💍
						<Link href="https://xn--sr8hvo.ws/%F0%9F%9B%81%F0%9F%9A%BC%F0%9F%A6%83/next">→</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
