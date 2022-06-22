import { FC, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { usePostsSearch } from '@/hooks/useSearch'
import useDebounce from '@/hooks/useDebounce'
import { default as Link } from '@/components/Link'
import { PostsSearchResult } from '@/lib/types'
import formatDate from '@/utils/formatDate'

const SearchLayout: FC = () => {
  const [query, setQuery] = useState('')

  const { data } = usePostsSearch<PostsSearchResult[]>(query)
  const handleChange = useDebounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, 1000)

  if (typeof window === 'object') {
    document.onkeydown = function press(event) {
      const searchClass = document.querySelector('#search')
      if (event.key === '/') {
        // 27 is the code for escape
        const el = document.activeElement
        if (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          el.contentEditable === 'true' ||
          el.tagName === 'INPUT' ||
          el.tagName === 'TEXTAREA' ||
          el.tagName === 'SELECT'
        ) {
          return
        }
        // focus input on pressing the slash key
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        searchClass.focus()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        searchClass.placeholder = 'Press ESC to cancel'
        event.preventDefault()
      } else if (event.key === 'Escape') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        searchClass.blur()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        searchClass.placeholder = 'Press / to focus'
        event.preventDefault()
      }
    }
  }

  return (
    <main className="container flex flex-col flex-1 px-3 mx-auto max-w-5xl">
      <h1 className="p-4 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-9 sm:leading-10 md:leading-14 text-gray-900 dark:text-gray-100">
        Search the blog
      </h1>
      <div className="py-6 border-t border-b border-gray-200 dark:border-gray-700">
        <div className="relative m-auto max-w-lg">
          <input
            id="search"
            aria-label="Search articles"
            type="text"
            placeholder="Press / to focus"
            onChange={handleChange}
            className="block py-2 px-4 w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-900"
          />

          <BiSearchAlt2 className="absolute top-3 right-3 w-5 h-5 text-gray-400 dark:text-gray-300" />
        </div>
      </div>
      {data && (
        <>
          {data?.length === 0 ? (
            <div className="text-center">
              <div className="py-4 m-auto text-5xl">( °□°) ︵ ┻━┻</div>
              <div className="pb-4 text-secondary">Nothing here...</div>
            </div>
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data?.map((result: any) => (
              <Link key={result.slug} href={`/blog/${result.slug}`}>
                <div className="flex justify-between p-4 border-b cursor-pointer">
                  <div className="overflow-hidden flex-1 truncate">
                    <div className="pb-1 font-medium">{result.title}</div>
                    <div className="font-mono text-xs text-secondary">
                      {formatDate(result.published_at)}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </>
      )}
    </main>
  )
}

export default SearchLayout
