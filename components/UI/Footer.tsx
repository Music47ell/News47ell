import {
  EnvelopeIcon,
  TwitterIcon,
  SupabaseIcon,
  NextDotJsIcon,
  TailwindCSSIcon,
  VercelIcon,
} from '@/components/icons'
import { default as Link } from '@/components/Link'
import HCard from '@/components/hCard'
import { NowPlaying } from '@/components/metrics/Spotify'
import { NowWatching } from '@/components/metrics/Trakt'
import siteMetadata from '@/data/siteMetadata'

export default function Footer(): JSX.Element {
  const icons = [SupabaseIcon, NextDotJsIcon, TailwindCSSIcon, VercelIcon]

  return (
    <footer className="bg-nfh-background-secondary py-4 print:hidden">
      <div className="flex flex-col items-center">
        <nav>
          <ul className="flex flex-wrap justify-center">
            {siteMetadata.upperFooterLinks.map((link) => (
              <li className="mx-3" key={link.href}>
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="my-3 flex space-x-4">
          <Link href={`mailto:${siteMetadata.email}`}>
            <EnvelopeIcon className="block h-6 w-6 fill-nfh-accent-primary" />
          </Link>
          <Link href={`https://twitter.com/${siteMetadata.twitter}`}>
            <TwitterIcon className="block h-6 w-6" />
          </Link>
        </div>
        <div className="site-credit my-2 flex items-center space-x-2">
          {siteMetadata.lowerFooterLinks.map((link, idx) => {
            const Icon = icons[idx]
            return (
              <Link href={link.href} key={link.href}>
                <Icon className="block h-6 w-6" />
              </Link>
            )
          })}
        </div>
        <div
          className="copyright mb-2 block space-x-2 text-center text-xs"
          itemProp="copyrightYear"
        >
          COPYRIGHT © 2013 / <span className="year">{new Date().getFullYear()}</span>
          {` `}
          {siteMetadata.altTitle}. ALL RIGHTS RESERVED.
        </div>
        <div className="text-center text-xs">
          Have a good {new Date().toLocaleString('default', { weekday: 'long' })}!
        </div>
        <div className="grid grid-cols-1">
          <NowPlaying />
          <NowWatching />
        </div>
        <div className="mt-4">
          <HCard />
        </div>
        <div className="text-center">
          <Link href="https://xn--sr8hvo.ws/%F0%9F%9B%81%F0%9F%9A%BC%F0%9F%A6%83/previous">←</Link>
          An IndieWeb Webring 🕸💍
          <Link href="https://xn--sr8hvo.ws/%F0%9F%9B%81%F0%9F%9A%BC%F0%9F%A6%83/next">→</Link>
        </div>
      </div>
    </footer>
  )
}
