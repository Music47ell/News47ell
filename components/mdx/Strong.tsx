import { HTMLAttributes } from 'react'

const Strong = ({ ...props }: HTMLAttributes<HTMLPreElement>) => {
	return <strong className="font-bold" {...props} />
}

export default Strong
