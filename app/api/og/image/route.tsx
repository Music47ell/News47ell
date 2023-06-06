import type { NextRequest } from 'next/server'
import { ImageResponse } from 'next/server'

import siteMetadata from '@/data/siteMetadata'

export const runtime = 'edge'

export const GET = async (req: NextRequest): Promise<ImageResponse> => {
	const title = req.nextUrl.searchParams.get('title')

	const url = process.env.NODE_ENV === 'production' ? siteMetadata.siteUrl : 'http://localhost:3000'

	return new ImageResponse(
		(
			<div tw="flex flex-col justify-center w-full h-full p-12 items-center bg-[#282a36]">
				<h1 tw="text-5xl text-gray-100 m-auto">{title}</h1>
				<div tw="flex flex-row items-center">
					<img src={`${url}/images/others/me.png`} tw="rounded-full w-20 h-20 mr-6" alt="Logo" />
					<span tw="text-3xl text-gray-100">{`${siteMetadata.title} by ${siteMetadata.author.name}`}</span>
				</div>
			</div>
		),
		{
			debug: req.nextUrl.searchParams.has('debug'),
		}
	)
}
