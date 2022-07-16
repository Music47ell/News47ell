import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import Table from '@/components/Table'
import siteMetadata from '@/data/siteMetadata'
import usesData from '@/data/usesData'

export default function Uses(): JSX.Element {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <main className="container flex flex-col flex-1 px-3 mx-auto space-y-2 md:space-y-5 max-w-5xl">
        <div className="divide-y divide-nfh-accent-primary">
          <div className="pt-6 pb-8 space-y-2 md:space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-9 sm:leading-10 md:leading-14">
              Uses
            </h1>
            <p className="text-lg leading-7">Software and hardware I use and recommend</p>
          </div>
          <div className="container py-6">
            <h2 className="text-3xl font-bold tracking-tight">Hardware</h2>
            <div className="my-4">
              {usesData.hardware.map((d, i) => (
                <Table ranking={i + 1} key={d.title} title={d.title} value={d.value} />
              ))}
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Software</h2>
            <div className="flex flex-wrap -mx-4">
              {usesData.software.map((d) => (
                <Card
                  key={d.title}
                  title={d.title}
                  description={d.description}
                  imgSrc={d.imgSrc}
                  href={d.href}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
