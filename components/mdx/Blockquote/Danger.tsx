import React, { FC, ReactNode } from 'react'

import { DangerIcon } from '@/components/icons'
type Props = {
	readonly children: ReactNode
}

export const Danger: FC<Props> = ({ children }) => {
	return (
		<div className="mb-5">
			<div className="bg-red-500 px-4 py-2 font-bold text-white">
				<span className="m-auto flex flex-row gap-1 font-semibold">
					{<DangerIcon className="fill-white" />} Danger
				</span>
			</div>
			<div className="border border-t-0 border-red-400 bg-red-100 px-4 py-3 text-gray-700">
				{children}
			</div>
		</div>
	)
}
