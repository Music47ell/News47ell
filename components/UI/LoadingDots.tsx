// Based on the fantastic https://vercel.com/design/loading-dots

export const LoadingDots = (): JSX.Element => {
  return (
    <div className="flex space-x-1">
      <div className="w-1.5 h-1.5 bg-nfh-background-secondary rounded-full animate-loading-0"></div>
      <div className="w-1.5 h-1.5 bg-nfh-background-secondary rounded-full animate-loading-1"></div>
      <div className="w-1.5 h-1.5 bg-nfh-background-secondary rounded-full animate-loading-2"></div>
    </div>
  )
}
