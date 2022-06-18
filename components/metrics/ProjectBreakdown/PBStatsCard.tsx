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
    <div className="flex justify-start items-center mb-2">
      <div className={`inline-block py-1 pr-2 text-xs font-semibold ${textColor} uppercase`}>
        {name}
      </div>
      <div className={`inline-block py-1 pr-2 text-xs font-semibold ${textColor} uppercase`}>
        {nFiles} files
      </div>
      <div className={`inline-block py-1 p-2 text-xs font-semibold ${textColor} uppercase`}>
        {code} lines
      </div>
      <div className={`inline-block py-1 px-2 text-xs font-semibold ${textColor}`}>
        {percentage}%
      </div>
    </div>
    <div className={`flex overflow-hidden mb-4 h-4 text-xs ${textColor} rounded`}>
      <div
        style={{ width: `${percentage}%` }}
        className={`flex flex-col justify-center text-center text-white
      whitespace-nowrap ${barColor} shadow-none`}
      ></div>
    </div>
  </>
)

export default PBStatsCard
