import { LikeIcon } from '@/components/icons'

export default function LikeCount({ likeCount }) {
  return (
    <div className="flex items-center rounded-lg text-center">
      <h2 className="m-0 text-3xl font-bold">{likeCount}</h2>
      <p className="ml-4 inline h-10 w-10">
        <LikeIcon className="block h-10 w-10 fill-nfh-accent-primary" />
      </p>
    </div>
  )
}
