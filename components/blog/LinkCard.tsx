import { useEffect, useState } from 'react'
import { default as Link } from '@/components/Link'
import { useOGMeta } from '@/hooks/useOGMeta'
import { BorderEffect } from '@/components/UI'

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
				<div className="animate-pulse overflow-hidden rounded-lg bg-white shadow-lg"></div>
			) : (
				<Link href={siteUrl}>
					<div className="group flex items-center justify-start overflow-hidden bg-nfh-background-secondary p-2 transition duration-500 hover:scale-100">
						<BorderEffect />
						<div className="relative h-32 w-64 shrink-0">
							<div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
								<img alt={title} className="w-full object-cover" src={image} />
							</div>
						</div>

						<div className="not-prose pl-2">
							<p className="text-sm text-nfh-text-primary">{title}</p>

							<p className="mt-1 text-sm text-nfh-text-secondary">{description}</p>

							<span className="not-prose flex items-center justify-start text-nfh-text-secondary">
								<img className="mr-1 h-4 w-4 rounded-full" src={siteFavicon} alt={siteName} />
								{siteName}
							</span>
						</div>
					</div>
				</Link>
			)}
		</>
	)
}

export default LinkCard
