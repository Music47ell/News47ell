import { TerminalIcon, MusicIcon, FilmIcon, BookmarkIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import StatsLayout from '@/layouts/StatsLayout'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import React from 'react'
import SectionContainer from '@/components/UI/SectionContainer'

export default function Stats(): JSX.Element {
  return (
    <>
      <PageSEO
        title={`Dashboard - ${siteMetadata.title}`}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <SectionContainer>
        <div className="md:flex md:justify-between md:items-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-xs">updated every 60 seconds</p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Link
            className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary hover:bg-nfh-accent-secondary rounded shadow-lg"
            href="/dashboard/codes"
          >
            <TerminalIcon className="block m-auto w-6 h-6 fill-nfh-accent-primary" />
          </Link>
          <Link
            className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary hover:bg-nfh-accent-secondary rounded shadow-lg"
            href="/dashboard/music"
          >
            <MusicIcon className="block m-auto w-6 h-6 fill-nfh-accent-primary" />
          </Link>
          <Link
            href="/dashboard/shows"
            className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary hover:bg-nfh-accent-secondary rounded shadow-lg"
          >
            <FilmIcon className="block m-auto w-6 h-6 fill-nfh-accent-primary" />
          </Link>
          <Link
            href="/dashboard/bookmarks"
            className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary hover:bg-nfh-accent-secondary rounded shadow-lg"
          >
            <BookmarkIcon className="block m-auto w-6 h-6 fill-nfh-accent-primary" />
          </Link>
        </div>
        <StatsLayout />
      </SectionContainer>
    </>
  )
}
