import type { APIRoute } from 'astro'
import satori from 'satori'
import { html as toReactElement } from 'satori-html'
import { Resvg, type ResvgRenderOptions } from '@resvg/resvg-js'
import siteMetadata from '@/data/siteMetadata'

export async function GET({ request }: APIContext) {
	const { searchParams } = new URL(request.url)
	const title = searchParams.has('title') ? searchParams.get('title') : siteMetadata.title

	const url = import.meta.env.PROD === 'production' ? siteMetadata.siteUrl : 'http://localhost:4321'

	const height = 630
	const width = 1200

	const html = toReactElement(`
	<div
		tw="flex flex-col justify-center w-full h-full p-12 items-center bg-[#282a36]"
	>
		<h1 tw="text-5xl text-gray-100 m-auto">${title}</h1>
		<div tw="flex flex-row items-center">
			<img
				src="${`${url}/images/others/me.png`}"
				tw="rounded-full w-20 h-20 mr-3"
				alt="${siteMetadata.author.name}"
			/>
			<span tw="text-5xl text-[#E30A17]">/</span>
			<span tw="text-3xl text-gray-100"
				>${siteMetadata.title.toLowerCase()} by ${siteMetadata.author.name}</span
			>
		</div>
	</div>`)

	const svg = await satori(html, {
		fonts: [
			{
				name: 'Alef',
				data: await fetch('https://fonts.gstatic.com/s/alef/v12/FeVfS0NQpLYgrjJbC5FxxbU.ttf').then(
					(res) => res.arrayBuffer()
				),
				style: 'normal',
			},
		],

		height,
		width,
	})

	const opts: ResvgRenderOptions = {
		fitTo: {
			mode: 'width',
			value: width,
		},
	}
	const resvg = new Resvg(svg, opts)
	const pngData = resvg.render()
	const pngBuffer = pngData.asPng()

	return new Response(pngBuffer, {
		status: 200,
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 's-maxage=1, stale-while-revalidate=59',
		},
	})
}
