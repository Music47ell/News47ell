'use client'

import { LoaderIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'
import { PageTitle } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'
import { useWeather } from '@/hooks/useWeather'
import { displayDateAndTime } from '@/utils/format-time-date'

export default function Now() {
	const { time, summary, temperature, humidity, windSpeed, isLoading } = useWeather()

	if (isLoading) {
		return (
			<SectionContainer className="!max-w-3xl">
				<div className="space-y-2 pt-6 pb-8 md:space-y-5">
					<PageTitle>Now</PageTitle>
					<p className="text-lg leading-7">
						The idea behind this page is to document what I'm doing right now.
					</p>
					<Link href="https://nownownow.com/about">Read more about it here</Link>.
				</div>
				<div className="flex justify-center">
					<LoaderIcon className="h-10 w-10 animate-spin fill-nfh-accent-primary" />
				</div>
			</SectionContainer>
		)
	}

	return (
		<SectionContainer className="!max-w-3xl">
			<div className="space-y-2 pt-6 pb-8 md:space-y-5">
				<PageTitle>Now</PageTitle>
				<p className="text-lg leading-7">
					The idea behind this page is to document what I'm doing right now.
				</p>
				<Link href="https://nownownow.com/about">Read more about it here</Link>.
			</div>
			<div className="container py-6">
				<p className="text-lg leading-7">
					It's {displayDateAndTime(time).date} and the time is {displayDateAndTime(time).time} here
					in {siteMetadata.location.country}. The weather is {summary} with a temperature of{' '}
					{temperature}°C and a humidity of {humidity}%. The wind speed is {windSpeed} km/h.
				</p>
			</div>
		</SectionContainer>
	)
}
