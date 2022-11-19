import { FC, useState } from 'react'

import { SearchIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import useDebounce from '@/hooks/useDebounce'
import { usePostsSearch } from '@/hooks/useSearch'
import { PostsSearchResult } from '@/lib/types'
import formatDate from '@/utils/formatDate'

const SearchLayout: FC = () => {
	const [query, setQuery] = useState('')

	const { data } = usePostsSearch<PostsSearchResult[]>(query)
	const handleChange = useDebounce((e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value.replace(/\s/g, '+'))
	}, 1000)

	if (typeof window === 'object') {
		document.onkeydown = function press(event) {
			const searchClass = document.querySelector('#search')
			if (event.key === '/') {
				// 27 is the code for escape
				const el = document.activeElement
				if (
					//@ts-ignore
					el.contentEditable === 'true' ||
					el.tagName === 'INPUT' ||
					el.tagName === 'TEXTAREA' ||
					el.tagName === 'SELECT'
				) {
					return
				}
				// focus input on pressing the slash key
				//@ts-ignore
				searchClass.focus()
				//@ts-ignore
				searchClass.placeholder = 'Press ESC to cancel'
				event.preventDefault()
			} else if (event.key === 'Escape') {
				//@ts-ignore
				searchClass.blur()
				//@ts-ignore
				searchClass.placeholder = 'Press / to focus'
				event.preventDefault()
			}
		}
	}

	return (
		<main className="container mx-auto my-8 flex max-w-5xl flex-1 flex-col px-3">
			<h1 className="p-4 text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
				Search the blog
			</h1>
			<div className="py-6">
				<div className="relative m-auto max-w-lg">
					<input
						id="search"
						aria-label="Search articles"
						type="text"
						placeholder="Press / to focus"
						onChange={handleChange}
						className="block w-full rounded-md border border-nfh-accent-primary bg-nfh-background-secondary py-2 px-4 text-nfh-text-secondary placeholder:text-nfh-text-primary placeholder:hover:text-nfh-accent-primary"
					/>

					<SearchIcon className="absolute top-3 right-3 h-5 w-5 fill-nfh-accent-primary" />
				</div>
			</div>
			{data && (
				<>
					{data?.length === 0 ? (
						<div className="text-center">
							<div className="m-auto py-4 text-5xl">( °□°) ︵ ┻━┻</div>
							<div className="pb-4">Nothing here...</div>
						</div>
					) : (
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						data?.map((result: any) => (
							<Link key={result.slug} href={`/blog/${result.slug}`}>
								<div className="flex cursor-pointer justify-between border-b border-nfh-accent-secondary p-4 hover:border-nfh-accent-primary">
									<div className="flex-1 overflow-hidden truncate">
										<div className="pb-1 font-medium">{result.title}</div>
										<div className="font-mono text-xs">{formatDate(result.published_at)}</div>
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
