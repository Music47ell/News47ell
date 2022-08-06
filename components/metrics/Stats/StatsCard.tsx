import { StatsCardProps } from 'lib/types'

export default function StatsCard({
  title,
  count,
  yesterday,
  children,
}: StatsCardProps): JSX.Element {
  return (
    <div className="flex items-center justify-between rounded-md bg-nfh-background-secondary p-4 text-nfh-text-primary">
      <div>
        <h6 className="text-xs font-medium uppercase leading-none tracking-wider">{title}</h6>
        <span className="text-xl font-semibold">{count > 0 ? count : '-'}</span>
        {yesterday > 0 ? (
          <span className="ml-2 inline-block rounded-md bg-nfh-background-primary py-px px-2 text-xs text-green-400">
            {yesterday} yesterday
          </span>
        ) : null}
      </div>
      <div>
        <span>{children}</span>
      </div>
    </div>
  )
}
