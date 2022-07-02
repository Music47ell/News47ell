import React from 'react'
import { BiMinus, BiCommentDetail, BiCodeAlt, BiFolder } from 'react-icons/bi'
import { TotalStatsCard } from 'lib/types'

const PBTotalStatsCard = ({ blank, comment, code, files }: TotalStatsCard): JSX.Element => (
  <>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="flex relative justify-center items-center space-x-1 h-16 rounded bg-off-main text-off-main">
        <BiMinus className="w-6 h-6" />
        <p className="text-xl font-bold">{blank} Blank Lines</p>
      </div>
      <div className="flex relative justify-center items-center space-x-1 h-16 rounded bg-off-main text-off-main">
        <BiCommentDetail className="w-6 h-6" />
        <p className="text-xl font-bold">{comment} Comments</p>
      </div>
      <div className="flex relative justify-center items-center space-x-1 h-16 rounded bg-off-main text-off-main">
        <BiCodeAlt className="w-6 h-6" />
        <p className="text-xl font-bold">{code} Lines of Code</p>
      </div>
      <div className="flex relative justify-center items-center space-x-1 h-16 rounded bg-off-main text-off-main">
        <BiFolder className="w-6 h-6" />
        <p className="text-xl font-bold">{files} Files</p>
      </div>
    </div>
  </>
)

export default PBTotalStatsCard
