import { BiLeftArrowAlt } from 'react-icons/bi'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { default as Link } from '@/components/Link'
import { MoviesWatched, ShowsWatched } from '@/components/metrics/Trakt'
import { TraktCard } from '@/components/metrics/Trakt'
import SectionContainer from '@/components/UI/SectionContainer'

export default function Shows(): JSX.Element {
  return (
    <>
      <PageSEO
        title={`Music Dashboard - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <SectionContainer>
        <div className="pt-6 space-y-2 md:space-y-5">
          <div className="relative">
            <h1 className="mb-4 text-3xl md:text-5xl font-bold tracking-tight">Shows</h1>
          </div>
          <div className="space-y-2 md:space-y-5">
            <Link
              href="/dashboard"
              className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary rounded shadow-lg"
            >
              <BiLeftArrowAlt className="m-auto w-6 h-6" />
            </Link>
          </div>
          <TraktCard />
        </div>
        <p className="mb-4">List of recent 10 movies I've watched</p>
        <MoviesWatched />
        <p className="mb-4">List of recent 10 tv shows I've watched</p>
        <ShowsWatched />
      </SectionContainer>
    </>
  )
}
