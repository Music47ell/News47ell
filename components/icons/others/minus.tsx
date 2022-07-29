function MinusIcon({ className }: { className?: string }): JSX.Element {
  return (
    <span className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M5 11h14v2H5z"></path>
      </svg>
    </span>
  )
}

export default MinusIcon