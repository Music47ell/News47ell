import { BiLike } from 'react-icons/bi'

export default function LikeCount({ likeCount }) {
  return (
    <div className="flex items-center text-center rounded-lg">
      <h2 className="m-0 text-3xl font-bold">{likeCount}</h2>
      <p className="ml-4 text-2xl">
        <BiLike />
      </p>
    </div>
  )
}
