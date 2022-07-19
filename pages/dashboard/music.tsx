import { BiListPlus, BiLeftArrowAlt } from 'react-icons/bi'
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
        <div className="pt-6 space-y-2 md:space-y-5">
          <div className="md:flex md:justify-between md:items-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-8">Music</h1>
            <p className="text-xs">Powered by Spotify API</p>
          </div>
          <div className="space-y-2 md:space-y-5">
            <Link
              href="/dashboard"
              className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary rounded shadow-lg"
            >
              <BiLeftArrowAlt className="m-auto w-6 h-6" />
            </Link>
            <Link
              href="/recommend/music"
              className="block py-3 px-3 text-xs font-bold leading-normal text-center uppercase bg-nfh-background-secondary rounded shadow-lg"
            >
              <BiListPlus className="m-auto w-6 h-6" />
              Recommend me some music
            </Link>
          </div>
        </div>
        <h3 className="text-2xl font-bold tracking-tight leading-8">Most Recent Tracks</h3>
        <RecentTracks />
        <h3 className="text-2xl font-bold tracking-tight leading-8">Daily Top Tracks</h3>
        <TopTracks />
      </SectionContainer>
    </>
  )
}
