import '@/assets/css/tailwind.css'

import type { AppProps, NextWebVitalsMetric } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'

import Quote from '@/components/Quote'
import { Footer, Header, Nav } from '@/components/UI'
import { SoundProvider } from '@/context/store'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	const [pickerOpen, setPickerOpen] = useState(false)

	return (
		<ThemeProvider>
			<SoundProvider>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<Header pickerOpen={pickerOpen} />
				<div
					className={`transition-transform ${
						pickerOpen ? 'translate-y-[124px] duration-200 ease-out' : 'duration-200 ease-in'
					}`}
				>
					<div className="flex min-h-screen flex-col">
						<Nav pickerOpen={pickerOpen} setPickerOpen={setPickerOpen} />
						<Quote />
						<Component {...pageProps} />
						<Footer />
					</div>
				</div>
			</SoundProvider>
		</ThemeProvider>
	)
}

export function reportWebVitals(metric: NextWebVitalsMetric): void {
	const slug = window.location.pathname
	const url = '/api/web-signals'
	const body = JSON.stringify({
		slug,
		name: metric.name,
		value: metric.value,
	})

	if (navigator.sendBeacon) {
		navigator.sendBeacon(url, body)
	} else {
		fetch(url, {
			body,
			method: 'POST',
			keepalive: true,
		})
	}
}
