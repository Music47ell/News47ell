'use client'

import '@/assets/css/tailwind.css'

import { Footer, Header } from '@/components/UI'

import Providers from './providers'

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className="bg-nfh-background-primary text-nfh-text-primary antialiased transition-colors duration-300">
				<div className="absolute inset-0 flex h-screen flex-col justify-between">
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
