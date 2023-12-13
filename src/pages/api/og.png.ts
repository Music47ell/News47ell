import type { APIRoute } from 'astro'
import { ImageResponse } from '@vercel/og'
import siteMetadata from '@/data/siteMetadata'

export async function GET({ request }: APIContext) {
	try {
		const { searchParams } = new URL(request.url)
		const title = searchParams.has('title') ? searchParams.get('title') : siteMetadata.title

		const url =
			import.meta.env.PROD === 'production' ? siteMetadata.siteUrl : 'http://localhost:4321'

		const html = {
			type: 'div',
			props: {
				tw: 'flex flex-col justify-center w-full h-full p-12 items-center bg-[#282a36]',
				children: [
					{
						type: 'h1',
						props: {
							tw: 'text-5xl text-gray-100 m-auto',
							children: title,
							fontFamily: 'Open Sans',
						},
					},
					{
						type: 'div',
						props: {
							tw: 'flex flex-row items-center',
							children: [
								{
									type: 'img',
									props: {
										src: `${url}/images/others/me.png`,
										tw: 'rounded-full w-30 h-30 mr-3',
										alt: siteMetadata.author.name,
									},
								},
								{
									type: 'span',
									props: {
										tw: 'text-5xl text-[#E30A17]',
										children: '/',
									},
								},
								{
									type: 'div',
									props: {
										tw: 'text-4xl text-gray-100 flex',
										children: [
											{
												type: 'span',
												props: {
													children: `${siteMetadata.title.toLowerCase()}`,
													style: {
														fontFamily: 'Alef', // Use Alef font for the title
													},
												},
											},
											{
												type: 'span',
												props: {
													children: 'by',
													tw: 'mx-3',
												},
											},
											{
												type: 'span',
												props: {
													children: siteMetadata.author.name,
													style: {
														fontFamily: 'Open Sans', // Use Open Sans font for the name
													},
												},
											},
										],
									},
								},
							],
						},
					},
				],
			},
		}

		// const svg = await satori(markup, {
		// 	width: 1200,
		// 	height: 630,
		// 	fonts: [
		// 		{
		// 			name: 'Alef',
		// 			data: await fetch('https://fonts.gstatic.com/s/alef/v12/FeVfS0NQpLYgrjJbC5FxxbU.ttf').then(
		// 				(res) => res.arrayBuffer()
		// 			),
		// 			weight: 400,
		// 			style: 'normal',
		// 		},
		// 	],
		// })
		// const png = sharp(Buffer.from(svg)).png()
		// const response = await png.toBuffer()

		return new ImageResponse(html, {
			width: 1200,
			height: 600,
			fonts: [
				{
					name: 'Alef',
					data: await fetch(
						'https://fonts.gstatic.com/s/alef/v12/FeVfS0NQpLYgrjJbC5FxxbU.ttf'
					).then((res) => res.arrayBuffer()),
					style: 'normal',
				},
				{
					name: 'Open Sans',
					data: await fetch(
						'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf'
					).then((res) => res.arrayBuffer()),
					style: 'normal',
				},
			],
		})
	} catch (e) {
		console.log(`${e.message}`)
		return new Response(`Failed to generate the image`, {
			status: 500,
		})
	}
}
