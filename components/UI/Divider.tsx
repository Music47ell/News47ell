type Props = {
  children?: React.ReactNode
}

export default function Divider({ children }: Props): JSX.Element {
  return (
    <div className="flex relative items-center py-5">
      <div className="flex-grow border-t border-nfh-accent-primary"></div>
      {children && <span className="flex-shrink mx-4">{children}</span>}
      <div className="flex-grow border-t border-nfh-accent-primary"></div>
    </div>
  )
}
