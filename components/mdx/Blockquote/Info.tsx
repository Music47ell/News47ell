import React, { FC, ReactNode } from 'react'

import { InfoIcon } from '@/components/icons'

type Props = {
	readonly children: ReactNode
}

export const Info: FC<Props> = ({ children }) => {
	return (
		<div className="mb-5">
			<div className="bg-blue-500 px-4 py-2 font-bold text-white">
				<span className="m-auto flex flex-row gap-1 font-semibold">
					{<InfoIcon className="fill-white" />} Info
				</span>
			</div>
			<div className="border border-t-0 border-blue-400 bg-blue-100 px-4 py-3 text-gray-700">
				{children}
			</div>
		</div>
	)
}
