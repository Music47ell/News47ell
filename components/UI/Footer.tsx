import { BiEnvelope } from 'react-icons/bi'
import { SiTwitter, SiSupabase, SiNextdotjs, SiTailwindcss, SiVercel } from 'react-icons/si'
import { default as Link } from '@/components/Link'
import HCard from '@/components/hCard'
import { NowPlaying } from '@/components/metrics/Spotify'
import { NowWatching } from '@/components/metrics/Trakt'
import siteMetadata from '@/data/siteMetadata'

export default function Footer(): JSX.Element {
  const icons = [SiSupabase, SiNextdotjs, SiTailwindcss, SiVercel]

  return (
    <footer>
      <div className="flex flex-col items-center mt-8">
        <nav>
          <ul className="flex flex-wrap justify-center">
            {siteMetadata.upperFooterLinks.map((link) => (
              <li className="mx-3" key={link.href}>
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex my-3 space-x-4">
          <Link href={`mailto:${siteMetadata.email}`}>
            <BiEnvelope className="w-6 h-6" />
          </Link>
          <Link href={`https://twitter.com/${siteMetadata.twitter}`}>
            <SiTwitter className="w-6 h-6 text-twitter" />
          </Link>
        </div>
        <span className="inline-flex items-center my-2 space-x-2 site-credit">
          {siteMetadata.lowerFooterLinks.map((link, idx) => {
            const Icon = icons[idx]
            return (
              <Link href={link.href} key={link.href}>
                <Icon />
              </Link>
            )
          })}
        </span>
        <div
          className="block mb-2 space-x-2 text-xs text-center copyright"
          itemProp="copyrightYear"
        >
          COPYRIGHT © 2013 / <span className="year">{new Date().getFullYear()}</span>
          {` `}
          {siteMetadata.altTitle}. ALL RIGHTS RESERVED.
        </div>
        <div className="text-xs text-center text-muted">
          Have a good {new Date().toLocaleString('default', { weekday: 'long' })}!
        </div>
        <div className="grid grid-cols-1">
          <NowPlaying />
          <NowWatching />
        </div>
        <div className="mt-4">
          <HCard />
        </div>
      </div>
    </footer>
  )
}
