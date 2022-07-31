import { useState, useEffect } from 'react'
import { LoaderIcon, ArrowLeftIcon } from '@/components/icons'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { BookmarkCard } from '@/components/metrics/Raindrop/'
import { useBookmarks } from '@/hooks/useBookmarks'
import { default as Link } from '@/components/Link'
import { RaindropCountCard } from '@/components/metrics/Raindrop'
import SectionContainer from '@/components/UI/SectionContainer'

export default function Bookmarks(): JSX.Element {
  const { bookmarks, tags, isLoading } = useBookmarks()
  const [displayBookmarks, setDisplayBookmarks] = useState(bookmarks)
  const [selectedTag, setSelectedTag] = useState<string>()

  // make sure bookmarks are visible on load if no tag is selected
  useEffect(() => {
    if (!selectedTag) {
      setDisplayBookmarks(bookmarks)
    }
  }, [bookmarks, selectedTag])

  const filterBookmarks = (tag?: string) => {
    if (tag) {
      setDisplayBookmarks(bookmarks.filter(({ tags }) => tags.includes(tag)))
    } else {
      setDisplayBookmarks(bookmarks)
    }
    setSelectedTag(tag)
  }

  return (
    <>
      <PageSEO
        title={`Bookmarks Dashboard - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <SectionContainer>
        <div className="space-y-2 pt-6 md:space-y-5">
          <div className="md:flex md:items-center md:justify-between">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Bookmarks</h1>
            <p className="text-xs">Powered by Raindrop API</p>
          </div>
          <div className="space-y-2 md:space-y-5">
            <Link
              href="/dashboard"
              className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg"
            >
              <ArrowLeftIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
            </Link>
          </div>
          <RaindropCountCard />
        </div>
        <p className="mb-4">Filter through all of my bookmarks</p>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <LoaderIcon className="h-12 w-12 animate-spin fill-nfh-accent-primary" />
          </div>
        ) : (
          <>
            <div className="text-center">
              <button onClick={() => filterBookmarks()}>All</button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => filterBookmarks(tag)}
                  className={`${selectedTag === tag ? 'pl-3' : 'pl-3 opacity-50'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {displayBookmarks.map(({ cover, link, title, lastUpdate, tags }) => (
              <BookmarkCard
                key={link}
                title={title}
                lastUpdate={lastUpdate}
                cover={cover}
                link={link}
                tags={tags}
              />
            ))}
          </>
        )}
      </SectionContainer>
    </>
  )
}
