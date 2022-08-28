import { StatsCard } from 'lib/types'
import React from 'react'

const PBStatsCard = ({
	name,
	nFiles,
	code,
	percentage,
	textColor,
	barColor,
}: StatsCard): JSX.Element => (
	<>
		<div className="mb-2 flex items-center justify-start">
			<div className={`inline-block py-1 pr-2 text-xs font-semibold ${textColor} uppercase`}>
				{name}
			</div>
			<div className={`inline-block py-1 pr-2 text-xs font-semibold ${textColor} uppercase`}>
				{nFiles} files
			</div>
			<div className={`inline-block p-2 py-1 text-xs font-semibold ${textColor} uppercase`}>
				{code} lines
			</div>
			<div className={`inline-block py-1 px-2 text-xs font-semibold ${textColor}`}>
				{percentage}%
			</div>
		</div>
		<div className={`mb-4 flex h-4 overflow-hidden text-xs ${textColor} rounded`}>
			<div
				style={{ width: `${percentage}%` }}
				className={`flex flex-col justify-center whitespace-nowrap text-center
      text-white ${barColor} shadow-none`}
			></div>
		</div>
	</>
)

export default PBStatsCard
