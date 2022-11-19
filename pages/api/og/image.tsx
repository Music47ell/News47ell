/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import type { PageConfig } from 'next'
import type { NextRequest } from 'next/server'

import siteMetadata from '@/data/siteMetadata'

export const config: PageConfig = {
	runtime: 'experimental-edge',
}

const handler = async (req: NextRequest): Promise<ImageResponse> => {
	const title = req.nextUrl.searchParams.get('title')
	const views = req.nextUrl.searchParams.get('views')
	const likes = req.nextUrl.searchParams.get('likes')
	const dislikes = req.nextUrl.searchParams.get('dislikes')
	const time = req.nextUrl.searchParams.get('time')
	const words = req.nextUrl.searchParams.get('words')
	const date = req.nextUrl.searchParams.get('date')
	const author = req.nextUrl.searchParams.get('author') || siteMetadata.author
	const domain = req.headers.get('host')
	const ogImages = ['brick-wall.svg', 'circuit-board.svg']
	const ogImage = ogImages[Math.floor(Math.random() * ogImages.length)]

	const url = process.env.NODE_ENV === 'production' ? siteMetadata.siteUrl : 'http://localhost:3000'

	return new ImageResponse(
		(
			<div
				style={{
					backgroundImage: `url(${url}/images/og/${ogImage})`,
				}}
				tw="flex flex-col justify-between w-full h-full p-12 bg-neutral-900/50"
			>
				<header tw="flex w-full items-center">
					<img src={`${url}/images/brand/logo.png`} tw="rounded-full w-20 h-20 mr-6" alt="Logo" />
					<span tw="text-xl text-gray-100 bg-neutral-700/80 p-5">{`${domain} by ${author}`}</span>
				</header>
				<div tw="flex flex-col justify-center items-center w-full">
					<h1 tw="text-5xl text-gray-100 bg-neutral-700/80 p-5">{title}</h1>
				</div>
				{views && (
					<footer tw="flex justify-between w-full text-3xl text-gray-100 bg-neutral-700/80 p-5">
						<span>{`${views} views • ${likes} likes • ${dislikes} dislikes`}</span>
						<span>{`${time} min read • ${words} words • ${date}`}</span>
					</footer>
				)}
			</div>
		),
		{
			debug: req.nextUrl.searchParams.has('debug'),
		}
	)
}

export default handler
