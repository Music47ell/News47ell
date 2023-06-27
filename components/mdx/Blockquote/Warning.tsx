import React, { FC, ReactNode } from 'react'

import { WarningIcon } from '@/components/icons'
type Props = {
	readonly children: ReactNode
}

export const Warning: FC<Props> = ({ children }) => {
	return (
		<div className="mb-5">
			<div className="bg-yellow-500 px-4 py-2 font-bold text-white">
				<span className="m-auto flex flex-row gap-1 font-semibold">{<WarningIcon />} Warning</span>
			</div>
			<div className="border border-t-0 border-yellow-400 bg-yellow-100 px-4 py-3 text-gray-700">
				{children}
			</div>
		</div>
	)
}
