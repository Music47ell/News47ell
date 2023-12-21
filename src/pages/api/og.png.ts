import type { APIRoute } from 'astro'
import { ImageResponse } from '@vercel/og'
import siteMetadata from '@/data/siteMetadata'

export async function GET({ request }: APIContext) {
	try {
		const { searchParams } = new URL(request.url)
		const title = searchParams.has('title') ? searchParams.get('title') : siteMetadata.title

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
									type: 'span',
									props: {
										tw: 'text-5xl text-[#E30A17]',
										children: '/',
									},
								},
								{
									type: 'div',
									props: {
										tw: 'text-5xl text-gray-100 flex',
										children: [
											{
												type: 'span',
												props: {
													children: `${siteMetadata.title.toLowerCase()}`,
													style: {
														fontFamily: 'Alef',
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
														fontFamily: 'Open Sans',
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
