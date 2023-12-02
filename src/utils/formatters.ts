import siteMetadata from '../data/siteMetadata'

const displayDate = (date: string) => {
	let currentDate = new Date()
	let targetDate = new Date(date)

	let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
	let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
	let daysAgo = currentDate.getDate() - targetDate.getDate()

	let formattedDate = ''

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`
	} else {
		formattedDate = 'Today'
	}

	let fullDate = targetDate.toLocaleString('en-us', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})

	return `${fullDate} (${formattedDate})`
}

const displayDateAndTime = (unix: number) => {
	// human-readable date and time for display purposes (e.g. blog posts)
	const time = new Date(unix * 1000).toLocaleTimeString(siteMetadata.locale, {
		hour: 'numeric',
		minute: 'numeric',
	})
	const date = new Date(unix * 1000).toLocaleDateString(siteMetadata.locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return { time, date }
}

const hEntryDate = (date: Date) => {
	// ISO8601 machine-readable datetime for h-entry microformat (https://indieweb.org/h-entry)
	const now = new Date(date).toISOString()

	return now
}

const displayNumbers = new Intl.NumberFormat('en-US', {
	maximumFractionDigits: 0,
})

export { displayDate, displayDateAndTime, displayNumbers, hEntryDate }
