import React from 'react'
import { MinusIcon, CommentIcon, CodeIcon, FolderIcon } from '@/components/icons'
import { TotalStatsCard } from 'lib/types'

const PBTotalStatsCard = ({ blank, comment, code, files }: TotalStatsCard): JSX.Element => (
  <>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="relative flex h-16 items-center justify-center space-x-1 rounded bg-nfh-background-secondary text-nfh-text-primary">
        <MinusIcon className="h-6 w-6 fill-nfh-accent-primary" />
        <p className="text-xl font-bold">{blank} Blank Lines</p>
      </div>
      <div className="relative flex h-16 items-center justify-center space-x-1 rounded bg-nfh-background-secondary text-nfh-text-primary">
        <CommentIcon className="h-6 w-6 fill-nfh-accent-primary" />
        <p className="text-xl font-bold">{comment} Comments</p>
      </div>
      <div className="relative flex h-16 items-center justify-center space-x-1 rounded bg-nfh-background-secondary text-nfh-text-primary">
        <CodeIcon className="h-6 w-6 fill-nfh-accent-primary" />
        <p className="text-xl font-bold">{code} Lines of Code</p>
      </div>
      <div className="relative flex h-16 items-center justify-center space-x-1 rounded bg-nfh-background-secondary text-nfh-text-primary">
        <FolderIcon className="h-6 w-6 fill-nfh-accent-primary" />
        <p className="text-xl font-bold">{files} Files</p>
      </div>
    </div>
  </>
)

export default PBTotalStatsCard
