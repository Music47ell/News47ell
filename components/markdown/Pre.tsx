import { useState, useRef } from 'react'
import { ClipboardIcon, ClipboardCheckIcon } from '@/components/icons'

const Pre = ({ node, inline, className, children, ...props }) => {
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
		<div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className="relative">
			{hovered && (
				<button
					aria-label="Copy code"
					type="button"
					className={`absolute right-2 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800 ${
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
			<pre className="!overflow-auto rounded-lg border-2 border-nfh-accent-secondary !bg-transparent p-4">
				<code className={`code-highlight language-${match[1]}`}>{children}</code>
			</pre>
		</div>
	)
}

export default Pre
