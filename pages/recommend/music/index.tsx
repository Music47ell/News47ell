import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'
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
      <main className="container flex flex-col flex-1 px-3 mx-auto max-w-5xl">
        <Link
          href="/dashboard/music"
          className="block py-3 px-3 text-xs font-bold leading-normal uppercase bg-nfh-background-secondary rounded shadow-lg"
        >
          <BiLeftArrowAlt className="m-auto w-6 h-6" />
        </Link>
        <div className="py-6 space-y-2 md:space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-9 sm:leading-10 md:leading-14 text-center">
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
            className="block pr-12 pl-7 w-full h-12 text-lg placeholder:text-nfh-text-primary text-nfh-text-secondary placeholder:hover:text-nfh-accent-primary bg-nfh-background-secondary rounded-md border-nfh-accent-primary focus:ring-2 focus:ring-nfh-accent-primary focus:ring-offset-2 focus:ring-offset-nfh-accent-primary transition duration-500 ease-in-out transform focus:outline-none"
            placeholder="Search for any song, artist, or album"
          />
        </div>

        {!isNoteEnabled &&
          !isRecommended &&
          searchResults.map((t) => (
            <div
              className="flex justify-between py-3 px-3 w-full h-24 border-t border-gray-500 border-solid"
              key={t.uri}
            >
              <div className="flex overflow-hidden gap-2.5 items-center w-full">
                <Image width="50" height="50" alt={t.album} src={t.image} />
                <div className="flex flex-col justify-center space-y-2 h-full">
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
              <div className="flex flex-col gap-2.5 justify-center items-center">
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
              <div className="py-12 mx-auto max-w-7xl">
                <div className="justify-center mx-auto sm:w-full text-left align-bottom sm:align-middle bg-nfh-background-secondary rounded-lg transition-all transform">
                  <div className="grid flex-wrap grid-cols-1 lg:grid-cols-2 justify-center items-center mx-auto rounded-xl shadow-xl">
                    <div className="py-3 px-6 w-full">
                      <div>
                        {song.preview && (
                          <audio className="m-auto" controls>
                            <source src={song.preview} type="audio/mpeg" />
                          </audio>
                        )}
                        <div className="mt-3 sm:mt-5 text-left">
                          <div className="inline-flex items-center w-full">
                            <h3 className="text-lg lg:text-5xl font-bold leading-6">Note</h3>
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
                            className="block py-3 px-5 w-full text-base placeholder:text-nfh-text-primary text-nfh-text-secondary placeholder:hover:text-nfh-accent-primary bg-nfh-accent-secondary rounded-lg border border-transparent focus:border-transparent focus:ring-2 focus:ring-nfh-accent-primary focus:ring-offset-2 focus:ring-offset-nfh-accent-primary transition duration-500 ease-in-out transform focus:outline-none"
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
                            className="block py-3 px-5 w-full text-base placeholder:text-nfh-text-primary text-nfh-text-secondary placeholder:hover:text-nfh-accent-primary bg-nfh-accent-secondary rounded-lg border border-transparent focus:border-transparent focus:ring-2 focus:ring-nfh-accent-primary focus:ring-offset-2 focus:ring-offset-nfh-accent-primary transition duration-500 ease-in-out transform focus:outline-none"
                            placeholder="Enter your note"
                            required
                          />
                        </div>
                        <div className="flex flex-col mt-4 space-y-2">
                          <button
                            type="submit"
                            onClick={() => {
                              sendEmail(song)
                            }}
                            className="flex justify-center items-center py-4 px-10 w-full text-base font-medium text-center text-nfh-text-primary bg-blue-600 hover:bg-blue-700 rounded-xl focus:ring-2 focus:ring-nfh-accent-primary focus:ring-offset-2 focus:ring-offset-nfh-accent-primary transition duration-500 ease-in-out transform focus:outline-none"
                          >
                            Recommend
                          </button>
                          <button
                            type="button"
                            onClick={handleReset}
                            className="flex justify-center items-center py-4 px-10 w-full text-base font-medium text-center text-nfh-text-primary bg-red-600 hover:bg-red-700 rounded-xl focus:ring-2 focus:ring-nfh-accent-primary focus:ring-offset-2 focus:ring-offset-nfh-accent-primary transition duration-500 ease-in-out transform focus:outline-none"
                          >
                            RESET
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex order-first w-full">
                      <Image
                        className="object-cover h-full bg-cover"
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
