import { BiTerminal, BiMusic, BiFilm, BiBookmark } from 'react-icons/bi'
import { default as Link } from '@/components/Link'

import StatsLayout from '@/layouts/StatsLayout'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import React from 'react'

export default function Stats(): JSX.Element {
  return (
    <>
      <PageSEO
        title={`Dashboard - ${siteMetadata.title}`}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <main className="container flex flex-col flex-1 px-3 mx-auto space-y-2 md:space-y-5 max-w-5xl">
        <div className="relative">
          <h1 className="mb-4 text-3xl md:text-5xl font-bold tracking-tight">Dashboard</h1>
          {/*<span className="text-2xl">(updated every 60 seconds)</span>*/}
        </div>

        <div className="flex flex-wrap">
          <div className="w-full">
            <ul className="flex flex-row flex-wrap pt-3 pb-4 mb-0 list-none" role="tablist">
              <li className="flex-auto mr-2 last:mr-0 -mb-px text-center">
                <Link
                  className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary hover:bg-nfh-accent-primary rounded shadow-lg"
                  href="/dashboard/codes"
                >
                  <BiTerminal className="m-auto w-6 h-6" />
                </Link>
              </li>
              <li className="flex-auto mr-2 last:mr-0 -mb-px text-center">
                <Link
                  className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary hover:bg-nfh-accent-primary rounded shadow-lg"
                  href="/dashboard/music"
                >
                  <BiMusic className="m-auto w-6 h-6" />
                </Link>
              </li>
              <li className="flex-auto mr-2 last:mr-0 -mb-px text-center">
                <Link
                  href="/dashboard/shows"
                  className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary hover:bg-nfh-accent-primary rounded shadow-lg"
                >
                  <BiFilm className="m-auto w-6 h-6" />
                </Link>
              </li>
              <li className="flex-auto mr-2 last:mr-0 -mb-px text-center">
                <Link
                  href="/dashboard/bookmarks"
                  className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary hover:bg-nfh-accent-primary rounded shadow-lg"
                >
                  <BiBookmark className="m-auto w-6 h-6" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <StatsLayout />
      </main>
    </>
  )
}
