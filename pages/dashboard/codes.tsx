import { BiLeftArrowAlt } from 'react-icons/bi'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { default as Link } from '@/components/Link'
import { TopLanguages } from '@/components/metrics/CodeStats'
import Divider from '@/components/UI/Divider'
import { CodeStatsCard } from '@/components/metrics/CodeStats'

export default function Codes(): JSX.Element {
  return (
    <>
      <PageSEO
        title={`Music Dashboard - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <main className="container flex flex-col flex-1 px-3 mx-auto space-y-2 md:space-y-5 max-w-5xl">
        <div className="pt-6 space-y-2 md:space-y-5">
          <div className="relative">
            <h1 className="mb-4 text-3xl md:text-5xl font-bold tracking-tight">Codes</h1>
          </div>
          <div className="space-y-2 md:space-y-5">
            <Link
              href="/dashboard"
              className="block py-3 px-3 text-xs font-bold leading-normal uppercase rounded shadow-lg bg-off-main"
            >
              <BiLeftArrowAlt className="m-auto w-6 h-6" />
            </Link>
          </div>
          <CodeStatsCard />
        </div>
        <div className="flex flex-col space-y-4">
          <Divider />
          <div className="space-y-1">
            <div className="md:flex md:justify-between md:items-center">
              <p className="text-sm uppercase">
                My top Programming Languages that I use updated in real time
              </p>
            </div>
            <TopLanguages />
          </div>
        </div>
      </main>
    </>
  )
}
