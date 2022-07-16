import { BiDislike } from 'react-icons/bi'

export default function DislikeCount({ dislikeCount }) {
  return (
    <div className="flex items-center text-center rounded-lg">
      <h2 className="m-0 text-3xl font-bold">{dislikeCount}</h2>
      <p className="ml-4 text-2xl">
        <BiDislike />
      </p>
    </div>
  )
}
