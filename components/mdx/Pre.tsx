import { HTMLAttributes, useRef, useState } from 'react'

import { ClipboardCheckIcon, ClipboardIcon } from '@/components/icons'

const Pre = ({ className, ...props }: HTMLAttributes<HTMLPreElement>) => {
	const textInput = useRef(null)
	const [hovered, setHovered] = useState(false)
	const [copied, setCopied] = useState(false)

	const match = /language-(\w+)/.exec(className || '')

	const onEnter = () => {
		setHovered(true)
	}
	const onExit = () => {
		setHovered(false)
		setCopied(false)
	}
	const onCopy = () => {
		setCopied(true)
		navigator.clipboard.writeText(textInput.current.textContent)
		setTimeout(() => {
			setCopied(false)
		}, 2000)
	}

	return (
		<div
			ref={textInput}
			onMouseEnter={onEnter}
			onMouseLeave={onExit}
			className="not-prose relative"
		>
			{hovered && (
				<button
					aria-label="Copy code"
					className={`absolute right-2 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 ${
						copied
							? 'border-green-400 focus:border-green-400 focus:outline-none'
							: 'border-gray-300'
					}`}
					onClick={onCopy}
				>
					{copied ? (
						<ClipboardCheckIcon className={copied ? 'text-green-400' : 'text-gray-300'} />
					) : (
						<ClipboardIcon className={copied ? 'text-green-400' : 'text-gray-300'} />
					)}
				</button>
			)}
			<pre className="!overflow-auto bg-neutral-800/50 py-3" {...props} />
		</div>
	)
}

export default Pre
