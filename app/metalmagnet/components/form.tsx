'use client'

import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'

import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { PageTitle } from '@/components/UI'
import { SectionContainer } from '@/components/UI'

export default function SongRecommendationForm() {
	const [selectedOption, setSelectedOption] = useState([
		{
			title: '',
			artists: [
				{
					name: '',
					url: '',
				},
			],
			image: '',
			url: '',
			uri: '',
			album: '',
			preview: '',
		},
	])
	const [isRecommended, setIsRecommended] = useState(false)
	const [isNoteEnabled, setNoteEnabled] = useState(false)
	const [note, setNote] = useState('')
	const [email, setEmail] = useState('')

	const [searchInput, setSearchInput] = useState('')
	const [searchResults, setSearchResults] = useState([
		{
			title: '',
			artists: [
				{
					name: '',
					url: '',
				},
			],
			image: '',
			url: '',
			uri: '',
			album: '',
			preview: '',
		},
	])

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
		title: string
		artists: { name: string; url: string }[]
		image: string
		url: string
		uri: string
		album: string
		preview: string
	}) => {
		setNoteEnabled(true)
		setSelectedOption([
			{
				title: song.title,
				artists: song.artists,
				image: song.image,
				url: song.url,
				uri: song.uri,
				album: song.album,
				preview: song.preview,
			},
		])
		setSearchResults([])
		setSearchInput(song.title)
	}

	const handleReset = () => {
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
			<div className="space-y-2 md:space-y-5">
				<div className="md:flex md:items-baseline md:justify-between">
					<PageTitle>Metal Magnet</PageTitle>
					<p className="text-xs">Powered by Spotify API & Turso</p>
				</div>
				<div className="space-y-2 md:space-y-5">
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
				searchInput.length > 0 &&
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
							<button
								onClick={() =>
									handleSelect({
										title: t.title,
										artists: t.artists,
										image: t.image,
										url: t.url,
										uri: t.uri,
										album: t.album,
										preview: t.preview,
									})
								}
								className="flex"
							>
								Add note?
							</button>
						</div>
					</div>
				))}

			{!isRecommended &&
				searchInput.length > 0 &&
				selectedOption.map((song) => (
					<form key={song.uri} className="my-4">
						<div className="relative flex flex-col rounded-xl border p-4">
							<div className="flex items-center pb-4">
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
										<Link href={song.url}>{song.title}</Link>
									</span>
									<span
										data-amplitude-song-info="artist"
										className="font-sans text-base font-medium leading-6 text-nfh-text-secondary"
									>
										{song.artists.map((a: { url: string; name: string }) => (
											<Link key={a.url} href={a.url}>
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
								<audio className="m-auto flex w-full flex-col px-10 pb-6" controls>
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
											className="block w-full rounded-lg border border-transparent bg-nfh-accent-secondary px-5 py-3 text-base text-nfh-text-secondary transition duration-500 ease-in-out placeholder:text-nfh-text-primary placeholder:hover:text-nfh-accent-primary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary"
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
											className="block w-full rounded-lg border border-transparent bg-nfh-accent-secondary px-5 py-3 text-base text-nfh-text-secondary transition duration-500 ease-in-out placeholder:text-nfh-text-primary placeholder:hover:text-nfh-accent-primary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary"
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
										className="flex w-full items-center justify-center rounded-xl bg-green-600 px-10 py-4 text-center text-base font-medium text-nfh-text-primary transition duration-500 ease-in-out hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary"
									>
										Recommend
									</button>
									<button
										onClick={handleReset}
										className="flex w-full items-center justify-center rounded-xl bg-red-600 px-10 py-4 text-center text-base font-medium text-nfh-text-primary transition duration-500 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-nfh-accent-primary"
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
