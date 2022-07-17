const SectionContainer = ({ children }) => {
  return (
    <main className="container flex flex-col flex-1 gap-y-5 px-3 my-8 mx-auto max-w-5xl">
      {children}
    </main>
  )
}

export default SectionContainer
