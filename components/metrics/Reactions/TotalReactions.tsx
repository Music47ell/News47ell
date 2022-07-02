// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function TotalReactions({ reactionsCount }) {
  return (
    <div className="flex items-center text-center rounded-lg">
      <h2 className="m-0 text-3xl font-bold">{reactionsCount}</h2>
    </div>
  )
}
