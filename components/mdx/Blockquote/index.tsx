import { Children, HTMLAttributes, isValidElement, ReactElement } from 'react'

import { Danger } from './Danger'
import { Info } from './Info'
import { Success } from './Success'
import { Warning } from './Warning'

const infoText = 'Info: '
const warningText = 'Warning: '
const successText = 'Success: '
const dangerText = 'Danger: '

const Blockquote = (props: HTMLAttributes<HTMLQuoteElement>) => {
	const { children } = props
	const childArray = Children.toArray(children)

	const isInfo =
		childArray.length > 0 &&
		isValidElement(childArray[0]) &&
		((typeof childArray[0].props['children'] === 'string' &&
			childArray[0].props['children'].startsWith(infoText)) ||
			(Array.isArray(childArray[0].props['children']) &&
				childArray[0].props['children'].length > 0 &&
				typeof childArray[0].props['children'][0] === 'string' &&
				childArray[0].props['children'][0].startsWith(infoText)))

	const isWarning =
		childArray.length > 0 &&
		isValidElement(childArray[0]) &&
		((typeof childArray[0].props['children'] === 'string' &&
			childArray[0].props['children'].startsWith(warningText)) ||
			(Array.isArray(childArray[0].props['children']) &&
				childArray[0].props['children'].length > 0 &&
				typeof childArray[0].props['children'][0] === 'string' &&
				childArray[0].props['children'][0].startsWith(warningText)))

	const isSuccess =
		childArray.length > 0 &&
		isValidElement(childArray[0]) &&
		((typeof childArray[0].props['children'] === 'string' &&
			childArray[0].props['children'].startsWith(successText)) ||
			(Array.isArray(childArray[0].props['children']) &&
				childArray[0].props['children'].length > 0 &&
				typeof childArray[0].props['children'][0] === 'string' &&
				childArray[0].props['children'][0].startsWith(successText)))

	const isDanger =
		childArray.length > 0 &&
		isValidElement(childArray[0]) &&
		((typeof childArray[0].props['children'] === 'string' &&
			childArray[0].props['children'].startsWith(dangerText)) ||
			(Array.isArray(childArray[0].props['children']) &&
				childArray[0].props['children'].length > 0 &&
				typeof childArray[0].props['children'][0] === 'string' &&
				childArray[0].props['children'][0].startsWith(dangerText)))

	if (isInfo) {
		const elements = childArray.filter((child) => isValidElement(child)) as ReactElement[]
		const texts = elements.map((elem) => {
			const innerChildren = elem.props['children']

			if (typeof innerChildren === 'string' && innerChildren.startsWith(infoText)) {
				return innerChildren.substring(infoText.length)
			}

			if (Array.isArray(innerChildren) && typeof innerChildren[0] === 'string') {
				return innerChildren.map((child) => {
					if (typeof child === 'string' && child.startsWith(infoText)) {
						return child.substring(infoText.length)
					}

					return child
				})
			}

			return innerChildren
		})

		return (
			<Info>
				{texts.map((text, index) => (
					<p key={index} className="m-auto">
						{text}
					</p>
				))}
			</Info>
		)
	}

	if (isWarning) {
		const elements = childArray.filter((child) => isValidElement(child)) as ReactElement[]
		const texts = elements.map((elem) => {
			const innerChildren = elem.props['children']

			if (typeof innerChildren === 'string' && innerChildren.startsWith(warningText)) {
				return innerChildren.substring(warningText.length)
			}

			if (Array.isArray(innerChildren) && typeof innerChildren[0] === 'string') {
				return innerChildren.map((child) => {
					if (typeof child === 'string' && child.startsWith(warningText)) {
						return child.substring(warningText.length)
					}

					return child
				})
			}

			return innerChildren
		})

		return (
			<Warning>
				{texts.map((text, index) => (
					<p key={index} className="m-auto">
						{text}
					</p>
				))}
			</Warning>
		)
	}

	if (isSuccess) {
		const elements = childArray.filter((child) => isValidElement(child)) as ReactElement[]
		const texts = elements.map((elem) => {
			const innerChildren = elem.props['children']

			if (typeof innerChildren === 'string' && innerChildren.startsWith(successText)) {
				return innerChildren.substring(successText.length)
			}

			if (Array.isArray(innerChildren) && typeof innerChildren[0] === 'string') {
				return innerChildren.map((child) => {
					if (typeof child === 'string' && child.startsWith(successText)) {
						return child.substring(successText.length)
					}

					return child
				})
			}

			return innerChildren
		})

		return (
			<Success>
				{texts.map((text, index) => (
					<p key={index} className="m-auto">
						{text}
					</p>
				))}
			</Success>
		)
	}

	if (isDanger) {
		const elements = childArray.filter((child) => isValidElement(child)) as ReactElement[]
		const texts = elements.map((elem) => {
			const innerChildren = elem.props['children']

			if (typeof innerChildren === 'string' && innerChildren.startsWith(dangerText)) {
				return innerChildren.substring(dangerText.length)
			}

			if (Array.isArray(innerChildren) && typeof innerChildren[0] === 'string') {
				return innerChildren.map((child) => {
					if (typeof child === 'string' && child.startsWith(dangerText)) {
						return child.substring(dangerText.length)
					}

					return child
				})
			}

			return innerChildren
		})

		return (
			<Danger>
				{texts.map((text, index) => (
					<p key={index} className="m-auto">
						{text}
					</p>
				))}
			</Danger>
		)
	}

	return <blockquote>{children}</blockquote>
}

export default Blockquote
