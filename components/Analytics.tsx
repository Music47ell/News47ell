import Script from 'next/script'

const Umami = () => {
	return (
		<>
			<Script
				async
				defer
				data-cache="true"
				data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
				src={process.env.NEXT_PUBLIC_UMAMI_TRACKER_SCRIPT_URL}
			/>
		</>
	)
}

const Analytics = () => {
	return <>{process.env.NODE_ENV === 'production' && <Umami />}</>
}

export default Analytics
