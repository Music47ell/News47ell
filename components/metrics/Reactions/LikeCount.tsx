import { LikeIcon } from '@/components/icons'

export default function LikeCount({ likeCount }) {
  return (
    <div className="flex items-center text-center rounded-lg">
      <h2 className="m-0 text-3xl font-bold">{likeCount}</h2>
      <p className="inline ml-4 w-10 h-10">
        <LikeIcon className="block w-10 h-10 fill-nfh-accent-primary" />
      </p>
    </div>
  )
}
