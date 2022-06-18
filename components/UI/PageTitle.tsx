import { IPageTitle } from 'lib/interfaces'

export default function PageTitle({ children }: IPageTitle): JSX.Element {
  return (
    <h1
      itemProp="name headline"
      className=" text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-9 sm:leading-10 md:leading-14 text-primary"
    >
      {children}
    </h1>
  )
}
