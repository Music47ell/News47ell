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
	const time = req.nextUrl.searchParams.get('time')
	const words = req.nextUrl.searchParams.get('words')
	const date = req.nextUrl.searchParams.get('date')
	const author = req.nextUrl.searchParams.get('author')

	const url = process.env.NODE_ENV === 'production' ? siteMetadata.siteUrl : 'http://localhost:3000'

	return new ImageResponse(
		(
			<div tw="flex flex-col justify-between w-full h-full p-12 bg-[#282a36]">
				<header tw="flex w-full items-center">
					<img src={`${url}/images/others/me.png`} tw="rounded-full w-20 h-20 mr-6" alt="Logo" />
					<span tw="text-3xl text-gray-100">{`${siteMetadata.title} by ${author}`}</span>
				</header>
				<div tw="flex flex-col justify-center items-center w-full">
					<h1 tw="text-5xl text-gray-100">{title}</h1>
				</div>
				{time && words && date ? (
					<footer tw="flex w-full text-3xl text-gray-100">
						<span>{`${time} min read • ${words} words • ${date}`}</span>
					</footer>
				) : null}
			</div>
		),
		{
			debug: req.nextUrl.searchParams.has('debug'),
		}
	)
}

export default handler
