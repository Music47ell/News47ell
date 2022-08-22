import { TerminalIcon, MusicIcon, FilmIcon, BookmarkIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import StatsLayout from '@/layouts/StatsLayout'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import React from 'react'
import { SectionContainer } from '@/components/UI'

export default function Stats(): JSX.Element {
  return (
    <>
      <PageSEO
        title={`Dashboard - ${siteMetadata.title}`}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <SectionContainer>
        <div className="md:flex md:items-center md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Dashboard</h1>
          <p className="text-xs">updated every 60 seconds</p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Link
            className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg hover:bg-nfh-accent-secondary"
            href="/dashboard/codes"
          >
            <TerminalIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
          </Link>
          <Link
            className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg hover:bg-nfh-accent-secondary"
            href="/dashboard/music"
          >
            <MusicIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
          </Link>
          <Link
            href="/dashboard/shows"
            className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg hover:bg-nfh-accent-secondary"
          >
            <FilmIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
          </Link>
          <Link
            href="/dashboard/bookmarks"
            className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg hover:bg-nfh-accent-secondary"
          >
            <BookmarkIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
          </Link>
        </div>
        <StatsLayout />
      </SectionContainer>
    </>
  )
}
