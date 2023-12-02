import type { APIRoute } from 'astro'
import { getEntryBySlug } from 'astro:content'
import * as fs from 'node:fs/promises'
import { html } from 'satori-html'
import satori from 'satori'
import sharp from 'sharp'
import siteMetadata from '@/data/siteMetadata'
import escapeRegExp from '@/utils/escapeRegExp'

export async function GET({ request }: APIContext) {
	const query = new URL(request.url).searchParams
	const title = escapeRegExp(String(query.get('title')))

	const importImage = await sharp(await fs.readFile('./public/images/others/me.png'))
		.resize(128)
		.png()
		.toBuffer()
	const imgSrc = 'data:image/png;base64,' + importImage.toString('base64')

	const markup =
		html(`<div tw="flex flex-col justify-center w-full h-full p-12 items-center bg-[#282a36]">
				<h1 tw="text-5xl text-gray-100 m-auto">${title}</h1>
				<div tw="flex flex-row items-center">
					<img src="${imgSrc}" tw="rounded-full w-20 h-20 mr-3" alt="${siteMetadata.author.name}" />
					<span tw="text-5xl text-[#E30A17]">/</span>
					<span tw="text-3xl text-gray-100">${siteMetadata.title.toLowerCase()} by ${
						siteMetadata.author.name
					}</span>
				</div>
			</div>`)
	const svg = await satori(markup, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'Alef',
				data: await fetch('https://fonts.gstatic.com/s/alef/v12/FeVfS0NQpLYgrjJbC5FxxbU.ttf').then(
					(res) => res.arrayBuffer()
				),
				weight: 400,
				style: 'normal',
			},
		],
	})
	const png = sharp(Buffer.from(svg)).png()
	const response = await png.toBuffer()

	return new Response(response, {
		status: 200,
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 's-maxage=1, stale-while-revalidate=59',
		},
	})
}
