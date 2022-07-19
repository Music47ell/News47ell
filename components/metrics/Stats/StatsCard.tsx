import { StatsCardProps } from 'lib/types'

export default function StatsCard({
  title,
  count,
  yesterday,
  children,
}: StatsCardProps): JSX.Element {
  return (
    <div className="flex justify-between items-center p-4 text-nfh-text-primary bg-nfh-background-secondary rounded-md">
      <div>
        <h6 className="text-xs font-medium tracking-wider leading-none uppercase">{title}</h6>
        <span className="text-xl font-semibold">{count > 0 ? count : '-'}</span>
        {yesterday > 0 ? (
          <span className="inline-block py-px px-2 ml-2 text-xs text-green-400 bg-nfh-background-primary rounded-md">
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
