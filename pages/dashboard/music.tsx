import { ListPlusIcon, ArrowLeftIcon } from '@/components/icons'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { RecentTracks, TopTracks } from '@/components/metrics/Spotify'
import { default as Link } from '@/components/Link'
import SectionContainer from '@/components/UI/SectionContainer'

export default function Music(): JSX.Element {
  return (
    <>
      <PageSEO
        title={`Music Dashboard - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <SectionContainer>
        <div className="space-y-2 pt-6 md:space-y-5">
          <div className="md:flex md:items-center md:justify-between">
            <h1 className="text-3xl font-bold leading-8 tracking-tight md:text-5xl">Music</h1>
            <p className="text-xs">Powered by Spotify API</p>
          </div>
          <div className="space-y-2 md:space-y-5">
            <Link
              href="/dashboard"
              className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg"
            >
              <ArrowLeftIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
            </Link>
            <Link
              href="/recommend/music"
              className="block rounded bg-nfh-background-secondary p-3 text-center text-xs font-bold uppercase leading-normal shadow-lg"
            >
              <ListPlusIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
              Recommend me some music
            </Link>
          </div>
        </div>
        <h3 className="text-2xl font-bold leading-8 tracking-tight">Most Recent Tracks</h3>
        <RecentTracks />
        <h3 className="text-2xl font-bold leading-8 tracking-tight">Daily Top Tracks</h3>
        <TopTracks />
      </SectionContainer>
    </>
  )
}
