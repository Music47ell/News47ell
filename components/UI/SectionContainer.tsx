import { ISectionContainer } from 'lib/interfaces'

export default function SectionContainer({ children }: ISectionContainer): JSX.Element {
  return (
    <main className="container grid relative grid-cols-10 gap-8 px-6 mx-auto max-w-3xl lg:max-w-5xl">
      <div className="flex flex-col col-span-10 lg:col-span-7">
        <div className="p-4 rounded md:border border-gray-600">{children}</div>
      </div>
    </main>
  )
}
