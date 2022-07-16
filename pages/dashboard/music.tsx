import { BiListPlus, BiLeftArrowAlt } from 'react-icons/bi'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { RecentTracks, TopTracks } from '@/components/metrics/Spotify'
import { default as Link } from '@/components/Link'

export default function Music(): JSX.Element {
  return (
    <>
      <PageSEO
        title={`Music Dashboard - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <main className="container flex flex-col flex-1 px-3 mx-auto space-y-2 md:space-y-5 max-w-5xl">
        <div className="pt-6 space-y-2 md:space-y-5">
          <div className="relative">
            <h1 className="mb-4 text-3xl md:text-5xl font-bold tracking-tight">Music</h1>
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
        <p className="mb-4">The 10 recent tracks I listened to.</p>
        <RecentTracks />
        <p className="mb-4">My daily updated top headbanging tracks.</p>
        <TopTracks />
      </main>
    </>
  )
}
