// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function TotalReactions({ reactionsCount }) {
  return (
    <p className="flex justify-between items-baseline mt-2 text-3xl font-bold">{reactionsCount}</p>
  )
}
