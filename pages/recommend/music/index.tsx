import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { ArrowLeftIcon } from '@/components/icons'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { default as Link } from '@/components/Link'
import { default as Image } from '@/components/Image'

export default function Stats() {
  const [selectedOption, setSelectedOption] = useState([])
  const [isRecommended, setIsRecommended] = useState(false)
  const [isNoteEnabled, setNoteEnabled] = useState(false)
  const [note, setNote] = useState('')
  const [email, setEmail] = useState('')

  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const addSong = (songURI, songTitle, note, email, setRecommendedHook) => {
    fetch(`/api/recommend/song?uri=${songURI}`, {
      method: 'POST',
      body: JSON.stringify({
        songTitle,
        songURI,
        note,
        email,
      }),
    })
    setRecommendedHook(true)
  }

  const handleSelect = (song: {
    value: string
    label: string
    uri: string
    title: string
    artists: string[]
  }) => {
    setNoteEnabled(true)
    setSelectedOption([song])
    setSearchResults([])
    setSearchInput(song.title)
  }

  const handleReset = () => {
    document.getElementById('search-input').focus()
    setIsRecommended(false)
    setSelectedOption([])
    setSearchResults([])
    setSearchInput('')
    setEmail('')
    setNote('')
  }

  useEffect(() => {
    async function fetchData() {
      if (searchInput.length > 0) {
        const res = await fetch(`/api/search/songs/${searchInput}`)
        const json = await res.json()
        setSearchResults(json)
      } else {
        setSearchResults([])
      }
    }
    fetchData()
  }, [searchInput])

  useEffect(() => {
    if (searchInput.length === 0) {
      setIsRecommended(false)
      setSelectedOption([])
      setSearchResults([])
      setSearchInput('')
      setNoteEnabled(false)
    }
  }, [searchInput])

  async function sendEmail(song: { uri: string; title: string }) {
    try {
      const formData = new FormData()

      if (!email.trim()) {
        throw new Error('Please provide a valid email address.')
      }

      if (!note.trim()) {
        throw new Error('Please provide a valid message.')
      }

      formData.append('email', email)
      formData.append('message', note)

      addSong(song.uri, song.title, note, email, setIsRecommended)
    } catch (error) {
      //toast.error(error.message)
    } finally {
      console.log('done')
    }
  }

  // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  useEffect(() => {
    return () => {
      // cleanup
    }
  }, [])

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <main className="container mx-auto flex max-w-5xl flex-1 flex-col px-3">
        <Link
          href="/dashboard/music"
          className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg"
        >
          <ArrowLeftIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
        </Link>
        <div className="space-y-2 py-6 md:space-y-5">
          <h1 className="text-center text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Recommend A Song
          </h1>
          <p>Find and add a song to my spotify playlist.</p>
        </div>
        <div className="flex flex-col pb-3">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            disabled={isRecommended}
            value={searchInput}
            id="search-input"
            className="block h-12 w-full rounded-md border-nfh-accent-primary bg-nfh-background-secondary pr-12 pl-7 text-lg text-nfh-text-secondary transition duration-500 ease-in-out placeholder:text-nfh-text-primary placeholder:hover:text-nfh-accent-primary focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary focus:ring-offset-2 focus:ring-offset-nfh-accent-primary"
            placeholder="Search for any song, artist, or album"
          />
        </div>

        {!isNoteEnabled &&
          !isRecommended &&
          searchResults.map((t) => (
            <div
              className="flex h-24 w-full justify-between border-t border-solid border-gray-500 p-3"
              key={t.uri}
            >
              <div className="flex w-full items-center gap-2.5 overflow-hidden">
                <Image width="50" height="50" alt={t.album} src={t.image} />
                <div className="flex h-full flex-col justify-center space-y-2">
                  <div>
                    <Link href={t.url}>{t.title}</Link>
                  </div>
                  <div>
                    {t.artists.map((a: { url: string; name: string }) => (
                      <Link key={a.url} href={a.url}>
                        {a.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2.5">
                <button
                  onClick={() => {
                    addSong(t.uri, t.title, note, email, setIsRecommended)
                  }}
                  className="flex"
                >
                  Recommend
                </button>
                <button onClick={() => handleSelect(t)} className="flex">
                  Add note?
                </button>
              </div>
            </div>
          ))}

        {!isRecommended &&
          selectedOption.map((song) => (
            <form key={song.uri}>
              <div className="mx-auto max-w-7xl py-12">
                <div className="mx-auto justify-center rounded-lg bg-nfh-background-secondary text-left align-bottom transition-all sm:w-full sm:align-middle">
                  <div className="mx-auto grid grid-cols-1 flex-wrap items-center justify-center rounded-xl shadow-xl lg:grid-cols-2">
                    <div className="w-full py-3 px-6">
                      <div>
                        {song.preview && (
                          <audio className="m-auto" controls>
                            <source src={song.preview} type="audio/mpeg" />
                          </audio>
                        )}
                        <div className="mt-3 text-left sm:mt-5">
                          <div className="inline-flex w-full items-center">
                            <h3 className="text-lg font-bold leading-6 lg:text-5xl">Note</h3>
                          </div>
                          <div className="mt-4 text-base">
                            <p>Why do you think this song is worth listening to? </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 space-y-2">
                        <div>
                          <label htmlFor="email" className="sr-only">
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="block w-full rounded-lg border border-transparent bg-nfh-accent-secondary py-3 px-5 text-base text-nfh-text-secondary transition duration-500 ease-in-out placeholder:text-nfh-text-primary placeholder:hover:text-nfh-accent-primary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary focus:ring-offset-2 focus:ring-offset-nfh-accent-primary"
                            placeholder="Enter your email"
                            required
                            value={email}
                            pattern=".+@.+\..+"
                            maxLength={320}
                            onChange={({ target }: ChangeEvent) =>
                              setEmail((target as HTMLInputElement).value)
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="sr-only">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            onChange={(e) => setNote(e.target.value)}
                            className="block w-full rounded-lg border border-transparent bg-nfh-accent-secondary py-3 px-5 text-base text-nfh-text-secondary transition duration-500 ease-in-out placeholder:text-nfh-text-primary placeholder:hover:text-nfh-accent-primary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary focus:ring-offset-2 focus:ring-offset-nfh-accent-primary"
                            placeholder="Enter your note"
                            required
                          />
                        </div>
                        <div className="mt-4 flex flex-col space-y-2">
                          <button
                            type="submit"
                            onClick={() => {
                              sendEmail(song)
                            }}
                            className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-4 px-10 text-center text-base font-medium text-nfh-text-primary transition duration-500 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary focus:ring-offset-2 focus:ring-offset-nfh-accent-primary"
                          >
                            Recommend
                          </button>
                          <button
                            type="button"
                            onClick={handleReset}
                            className="flex w-full items-center justify-center rounded-xl bg-red-600 py-4 px-10 text-center text-base font-medium text-nfh-text-primary transition duration-500 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary focus:ring-offset-2 focus:ring-offset-nfh-accent-primary"
                          >
                            RESET
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="order-first flex w-full">
                      <Image
                        className="h-full bg-cover object-cover"
                        width={600}
                        height={600}
                        alt={`${song.title} album cover`}
                        src={song.image}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ))}

        {isRecommended && (
          <>
            <h1>Thanks for the song 🎵</h1>
            <button onClick={handleReset}>Clear</button>
          </>
        )}
      </main>
    </>
  )
}
