import { useState, useEffect } from 'react'
import { BiLoader, BiLeftArrowAlt } from 'react-icons/bi'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { BookmarkCard } from '@/components/metrics/Raindrop/'
import { useBookmarks } from '@/hooks/useBookmarks'
import { default as Link } from '@/components/Link'
import { RaindropCountCard } from '@/components/metrics/Raindrop'

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
      <main className="container flex flex-col flex-1 px-3 mx-auto space-y-2 md:space-y-5 max-w-5xl">
        <div className="pt-6 space-y-2 md:space-y-5">
          <div className="relative">
            <h1 className="mb-4 text-3xl md:text-5xl font-bold tracking-tight">Bookmarks</h1>
          </div>
          <div className="space-y-2 md:space-y-5">
            <Link
              href="/dashboard"
              className="block py-3 px-3 text-xs font-bold leading-normal uppercase rounded shadow-lg bg-off-main"
            >
              <BiLeftArrowAlt className="m-auto w-6 h-6" />
            </Link>
          </div>
          <RaindropCountCard />
        </div>
        <p className="mb-4">Filter through all of my bookmarks</p>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <BiLoader className="w-12 h-12 animate-spin" />
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
      </main>
    </>
  )
}
