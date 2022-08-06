function DesktopIcon({ className }: { className?: string }): JSX.Element {
  return (
    <span className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20 3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h7v2H8v2h8v-2h-3v-2h7c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 14V5h16l.002 9H4z"></path>
      </svg>
    </span>
  )
}

export default DesktopIcon
