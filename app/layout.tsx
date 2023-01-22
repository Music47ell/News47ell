'use client'

import '@/assets/css/tailwind.css'

import { Footer, Header } from '@/components/UI'

import Providers from './providers'

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="bg-nfh-background-primary text-nfh-text-primary antialiased">
				<div className="absolute inset-0 flex flex-col justify-between">
					<Providers>
						<Header />
						{children}
						<Footer />
					</Providers>
				</div>
			</body>
		</html>
	)
}
