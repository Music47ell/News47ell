import React from 'react'

import { PBStatsCard, PBTotalStatsCard } from '@/components/metrics/ProjectBreakdown'
import codeStats from '@/data/count_total.json'

const ProjectBreakdown = (): JSX.Element => {
	const { TypeScript, JavaScript, SUM } = codeStats
	const cards = { TypeScript, JavaScript }
	const { blank, comment, code, nFiles } = SUM

	const textColors = ['text-typescript', 'text-javascript']
	const barColor = ['bg-typescript', 'bg-javascript']

	const statsByCodeCount = []
	const statsByFileCount = []
	let remainingPct = 100
	Object.keys(cards).forEach((key) => {
		remainingPct = remainingPct - Math.floor((cards[key].code / SUM.code) * 100)
		cards[key].percentage = Math.floor((cards[key].code / SUM.code) * 100)
	})
	Object.keys(cards).forEach((item) => {
		statsByCodeCount.push({
			name: item,
			value: cards[item].code,
		})
		statsByFileCount.push({
			name: item,
			value: cards[item].nFiles,
		})
	})

	return (
		<>
			<div className="space-y-1">
				<div className="md:flex md:items-center md:justify-between">
					<p className="text-sm uppercase">SITE LINES BY LANGUAGE</p>
				</div>
				<div className="w-full space-y-2 rounded bg-nfh-background-secondary p-4">
					{Object.keys(cards).map(function (item, index) {
						return (
							<PBStatsCard
								key={item}
								name={item}
								textColor={textColors[index]}
								barColor={barColor[index]}
								{...cards[item]}
							/>
						)
					})}
					<div className="mb-2 flex items-center justify-start">
						<div className="inline-block py-1 pr-2 text-xs font-semibold uppercase text-nfh-text-primary">
							Others
						</div>
						<div className="inline-block py-1 pr-2 text-xs font-semibold uppercase text-nfh-text-primary">
							{remainingPct}% Other
						</div>
					</div>
					<div className="mb-4 flex h-4 overflow-hidden rounded text-xs text-nfh-text-primary">
						<div
							style={{ width: `${remainingPct}%` }}
							className="flex flex-col justify-center whitespace-nowrap bg-nfh-background-primary
      text-center text-nfh-text-primary shadow-none"
						></div>
					</div>
				</div>
			</div>
			<div className="space-y-1">
				<div className="md:flex md:items-center md:justify-between">
					<p className="text-sm uppercase">Totals</p>
				</div>
				<PBTotalStatsCard blank={blank} comment={comment} code={code} files={nFiles} />
			</div>
		</>
	)
}

export default ProjectBreakdown
