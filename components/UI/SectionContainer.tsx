const SectionContainer = ({ children }) => {
  return (
    <main className="container my-8 mx-auto flex max-w-5xl flex-1 flex-col gap-y-5 px-3 print:my-8">
      {children}
    </main>
  )
}

export default SectionContainer
