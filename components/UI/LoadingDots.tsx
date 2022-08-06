// Based on the fantastic https://vercel.com/design/loading-dots

export const LoadingDots = (): JSX.Element => {
  return (
    <div className="flex space-x-1">
      <div className="h-1.5 w-1.5 animate-loading-0 rounded-full bg-nfh-background-secondary"></div>
      <div className="h-1.5 w-1.5 animate-loading-1 rounded-full bg-nfh-background-secondary"></div>
      <div className="h-1.5 w-1.5 animate-loading-2 rounded-full bg-nfh-background-secondary"></div>
    </div>
  )
}
