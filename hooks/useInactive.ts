import React from 'react'

export const useInactiveTab = () => {
	React.useEffect(() => {
		const blurMessage = [
			'Please come back! :-( ',
			"Don't you love me anymore? :-(",
			'Fancy a cookie? ',
			"I'm feeling lonely :-( ",
		]

		const { title } = document
		let intervalTimer: string | number | NodeJS.Timer | undefined
		let timeoutTimer: string | number | NodeJS.Timeout | undefined

		window.addEventListener('blur', () => {
			intervalTimer = setInterval(() => {
				const rand = Math.floor(Math.random() * blurMessage.length)
				document.title = blurMessage[rand]
				timeoutTimer = setTimeout(() => {
					document.title = title
				}, 4000)
			}, 12000)
		})

		window.addEventListener('focus', () => {
			clearInterval(intervalTimer)
			clearTimeout(timeoutTimer)
			document.title = title
		})
	})
}
