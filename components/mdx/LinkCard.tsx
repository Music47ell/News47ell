/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

import { default as Link } from '@/components/Link'
import { BorderEffect } from '@/components/UI'
import { LoadingDots } from '@/components/UI'
import { useOGMeta } from '@/hooks/useOGMeta'

const LinkCard = ({ url }: { url: string }) => {
	const { data, isLoading } = useOGMeta(url)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')
	const [siteName, setSiteName] = useState('')
	const [siteUrl, setSiteUrl] = useState('')
	const [siteFavicon, setSiteFavicon] = useState('')

	useEffect(() => {
		if (data) {
			setTitle(data.meta.title)
			setDescription(data.meta.description)
			setImage(data.meta.image.url)
			setSiteName(data.meta.site.name)
			setSiteUrl(data.meta.url)
			setSiteFavicon(data.meta.site.favicon)
		}
	}, [data])

	return (
		<>
			{isLoading ? (
				<LoadingDots />
			) : (
				<Link
					href={siteUrl}
					className="not-prose group relative flex cursor-pointer flex-col items-center bg-nfh-background-secondary transition duration-500 md:flex-row"
				>
					<BorderEffect />
					<img className="w-full object-cover md:w-80" src={image} alt={title} />
					<div className="flex flex-col justify-between p-4 leading-normal">
						<h5 className="mb-2 text-sm font-bold tracking-tight text-nfh-text-primary">{title}</h5>
						<p className="mb-3 text-sm font-normal text-nfh-text-secondary">{description}</p>
						<span className="inline-flex text-sm font-medium">
							<img className="mr-2 h-5 w-5 rounded-full" src={siteFavicon} alt={siteName} />
							{siteName}
						</span>
					</div>
				</Link>
			)}
		</>
	)
}

export default LinkCard
