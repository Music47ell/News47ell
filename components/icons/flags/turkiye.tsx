function TurkiyeIcon({ className }: { className?: string }): JSX.Element {
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width="47"
        height="31"
        viewBox="0 0 47 31"
        fill="none"
      >
        <path fill="#E30A17" d="M47 0H0V31H47V0Z" />
        <path
          fill="#FFFFFF"
          d="M16.6 23.3C21 23.3 24.5 19.8 24.5 15.5 24.5 11.2 21 7.8 16.6 7.8 12.3 7.8 8.8 11.2 8.8 15.5 8.8 19.8 12.3 23.3 16.6 23.3Z"
        />
        <path
          fill="#E30A17"
          d="M18.6 21.7C22.1 21.7 24.9 18.9 24.9 15.5 24.9 12.1 22.1 9.3 18.6 9.3 15.1 9.3 12.3 12.1 12.3 15.5 12.3 18.9 15.1 21.7 18.6 21.7Z"
        />
        <path fill="#FFFFFF" d="M22.8 15.5L29.9 17.8 25.6 11.8V19.2L29.9 13.2 22.8 15.5Z" />
      </svg>
    </span>
  )
}

export default TurkiyeIcon