export default function ThemeSwatch({ title, active }): JSX.Element {
  return (
    <div
      className={`${title.toLowerCase()}${
        active ? 'transform ring ring-primary' : ''
      } rounded flex flex-col items-center px-5 py-3 text-main bg-main transition-all hover:scale-105 hover:shadow-lg bg-nfh-background-primary text-nfh-text-primary`}
      data-theme={title.toLowerCase()}
    >
      <span className="text-sm">{title}</span>
      <div className="flex mt-4 -space-x-2">
        <div className={`h-8 w-8 rounded-full border bg-nfh-background-primary`} />
        <div className={`h-8 w-8 rounded-full border bg-nfh-background-secondary`} />
        <div className={`h-8 w-8 rounded-full border bg-nfh-accent-primary`} />
        <div className={`h-8 w-8 rounded-full border bg-nfh-accent-secondary`} />
      </div>
    </div>
  )
}
