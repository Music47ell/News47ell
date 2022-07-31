import { DislikeIcon } from '@/components/icons'

export default function DislikeCount({ dislikeCount }) {
  return (
    <div className="flex items-center rounded-lg text-center">
      <h2 className="m-0 text-3xl font-bold">{dislikeCount}</h2>
      <p className="ml-4 inline h-10 w-10">
        <DislikeIcon className="block h-10 w-10 fill-nfh-accent-primary" />
      </p>
    </div>
  )
}
