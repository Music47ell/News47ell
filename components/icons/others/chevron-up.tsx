function ChevronUpIcon({ className }: { className?: string }): JSX.Element {
  return (
    <span className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
      </svg>
    </span>
  )
}

export default ChevronUpIcon
