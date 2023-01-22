'use client'

import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'

import { ArrowLeftIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'

export default function MusicRecommend() {
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
			console.error(error)
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
		<SectionContainer>
			<div className="space-y-2 pt-6 md:space-y-5">
				<div className="md:flex md:items-center md:justify-between">
					<h1 className="text-3xl font-bold leading-8 tracking-tight md:text-5xl">
						Recommend A Song
					</h1>
					<p className="text-xs">Powered by Spotify API & Supabase</p>
				</div>
				<div className="space-y-2 md:space-y-5">
					<Link
						href="/dashboard/music"
						className="block rounded bg-nfh-background-secondary p-3 text-xs font-bold uppercase leading-normal shadow-lg"
					>
						<ArrowLeftIcon className="m-auto block h-6 w-6 fill-nfh-accent-primary" />
					</Link>
					<input
						onChange={(e) => setSearchInput(e.target.value)}
						disabled={isRecommended}
						value={searchInput}
						id="search-input"
						className="block w-full rounded-md border border-nfh-accent-primary bg-nfh-background-secondary px-4 py-2 text-nfh-text-secondary transition duration-500 ease-in-out placeholder:text-nfh-text-primary placeholder:hover:text-nfh-accent-primary focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary"
						placeholder="Search for any song, artist, or album"
					/>
				</div>
			</div>

			{!isNoteEnabled &&
				!isRecommended &&
				searchResults.map((t) => (
					<div className="flex w-full justify-between" key={t.uri}>
						<div className="flex w-full items-center gap-2.5 overflow-hidden">
							<Image width={50} height={50} alt={t.title} src={t.image} />
							<div className="ml-3 flex flex-col items-start justify-center text-ellipsis">
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
					<form key={song.uri} className="my-4">
						<div className="relative flex flex-col rounded-xl border p-4">
							<div className="z-50 flex items-center px-10 pb-4">
								<Image
									className="mr-6 h-40 w-40 bg-cover object-cover"
									width={600}
									height={600}
									alt={`${song.title} album cover`}
									src={song.image}
								/>

								<div className="flex flex-col">
									<span
										data-amplitude-song-info="name"
										className="font-sans text-lg font-medium leading-7 text-nfh-text-primary"
									>
										{song.title}
									</span>
									<span
										data-amplitude-song-info="artist"
										className="font-sans text-base font-medium leading-6 text-nfh-text-secondary"
									>
										{song.artists.map((a: { url: string; name: string }) => (
											<Link key={a.url} href={a.name}>
												{a.name}
											</Link>
										))}
									</span>
									<span
										data-amplitude-song-info="album"
										className="font-sans text-base font-medium leading-6 text-gray-500"
									>
										{song.album}
									</span>
								</div>
							</div>
							{song.preview && (
								<audio className="z-50 m-auto flex w-full flex-col px-10 pb-6" controls>
									<source src={song.preview} type="audio/mpeg" />
								</audio>
							)}
							<div className="mt-6 grid gap-4 space-y-2">
								<div className="mt-3 text-left sm:mt-5">
									<div className="inline-flex w-full items-center">
										<h3 className="text-lg font-bold leading-6 lg:text-5xl">Note</h3>
									</div>
									<div className="mt-4 text-base">
										<p>Why do you think this song is worth listening to? </p>
									</div>
								</div>
								<div className="w-full">
									<label htmlFor="email">
										<span>Email</span>
										<input
											id="email"
											name="email"
											type="email"
											className="block w-full rounded-lg border border-transparent bg-nfh-accent-secondary py-3 px-5 text-base text-nfh-text-secondary transition duration-500 ease-in-out placeholder:text-nfh-text-primary placeholder:hover:text-nfh-accent-primary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary"
											placeholder="Enter your email"
											required
											value={email}
											pattern=".+@.+\..+"
											maxLength={320}
											onChange={({ target }: ChangeEvent) =>
												setEmail((target as HTMLInputElement).value)
											}
										/>
									</label>
								</div>
								<div className="w-full">
									<label htmlFor="message">
										<span>Message</span>
										<textarea
											id="message"
											name="message"
											onChange={(e) => setNote(e.target.value)}
											className="block w-full rounded-lg border border-transparent bg-nfh-accent-secondary py-3 px-5 text-base text-nfh-text-secondary transition duration-500 ease-in-out placeholder:text-nfh-text-primary placeholder:hover:text-nfh-accent-primary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary"
											placeholder="Enter your note"
											required
										/>
									</label>
								</div>
								<div className="mt-4 flex flex-col space-y-2">
									<button
										type="submit"
										onClick={() => {
											sendEmail(song)
										}}
										className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-4 px-10 text-center text-base font-medium text-nfh-text-primary transition duration-500 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary"
									>
										Recommend
									</button>
									<button
										onClick={handleReset}
										className="flex w-full items-center justify-center rounded-xl bg-red-600 py-4 px-10 text-center text-base font-medium text-nfh-text-primary transition duration-500 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary"
									>
										RESET
									</button>
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
		</SectionContainer>
	)
}
