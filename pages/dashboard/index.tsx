import { BiTerminal, BiMusic, BiFilm, BiBookmark } from 'react-icons/bi'
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
          <h3 className="text-2xl font-bold tracking-tight leading-8">Dashboard</h3>
          <p className="text-xs">updated every 60 seconds</p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Link
            className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary hover:bg-nfh-accent-primary rounded shadow-lg"
            href="/dashboard/codes"
          >
            <BiTerminal className="m-auto w-6 h-6" />
          </Link>
          <Link
            className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary hover:bg-nfh-accent-primary rounded shadow-lg"
            href="/dashboard/music"
          >
            <BiMusic className="m-auto w-6 h-6" />
          </Link>
          <Link
            href="/dashboard/shows"
            className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary hover:bg-nfh-accent-primary rounded shadow-lg"
          >
            <BiFilm className="m-auto w-6 h-6" />
          </Link>
          <Link
            href="/dashboard/bookmarks"
            className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary hover:bg-nfh-accent-primary rounded shadow-lg"
          >
            <BiBookmark className="m-auto w-6 h-6" />
          </Link>
        </div>
        <StatsLayout />
      </SectionContainer>
    </>
  )
}
