import HCard from '@/components/hCard'
import { Slash } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { NowPlaying } from '@/components/metrics/Lastfm'
import { NowWatching } from '@/components/metrics/Trakt'
import siteMetadata from '@/data/siteMetadata'

export default function Footer(): JSX.Element {
	return (
		<footer className="p-4 print:hidden">
			<div className="m-auto flex max-w-md flex-col items-center">
				<div className="grid grid-cols-1">
					<div className="flex items-center justify-between space-x-3">
						{siteMetadata.headerNavLinks.map((link, index) => (
							<Link key={index} href={link.href}>
								{link.title}
							</Link>
						))}
					</div>
					<NowPlaying />
					<NowWatching />
					<HCard />
					<div className="flex items-center justify-between space-x-3">
						{siteMetadata.author.social.map((link, index) => (
							<Link key={index} href={link.href}>
								{link.title}
							</Link>
						))}
					</div>
					<div className="copyright mt-2 text-center text-xs" itemProp="copyrightYear">
						COPYRIGHT © 2013 / <span className="year">{new Date().getFullYear()}</span>{' '}
						{siteMetadata.altTitle}. ALL RIGHTS RESERVED.
					</div>
					<div className="mt-2 text-center">
						<Link href="https://xn--sr8hvo.ws/%F0%9F%9B%81%F0%9F%9A%BC%F0%9F%A6%83/previous">
							←
						</Link>
						An IndieWeb Webring 🕸💍
						<Link href="https://xn--sr8hvo.ws/%F0%9F%9B%81%F0%9F%9A%BC%F0%9F%A6%83/next">→</Link>
						<p className="text-xs">
							Have a good {new Date().toLocaleString('default', { weekday: 'long' })}!
						</p>
					</div>
					<div className="m-auto my-6">
						<Link href="/" aria-label={siteMetadata.title}>
							<Slash className="block h-10 w-auto" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
