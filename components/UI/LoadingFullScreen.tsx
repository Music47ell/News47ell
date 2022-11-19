import Image from 'next/image'
import React from 'react'

export default function LoadingFullScreen() {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden px-4 outline-none backdrop-blur focus:outline-none">
			<div className="w-24 pb-4">
				<Image
					src="/images/brand/slash_large.svg"
					alt="News47ell Logo"
					width={288}
					height={288}
					className="animate-pulse"
				/>
			</div>
		</div>
	)
}
