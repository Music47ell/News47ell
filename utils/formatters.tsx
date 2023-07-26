import siteMetadata from '@/data/siteMetadata'

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

const displayDate = (date: string | number) => {
	// human-readable date and time for display purposes (e.g. blog posts)
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	const now = new Date(date).toLocaleDateString(siteMetadata.locale, options)

	return now
}

const hEntryDate = (date: string) => {
	// ISO8601 machine-readable datetime for h-entry microformat (https://indieweb.org/h-entry)
	const now = new Date(date).toISOString()

	return now
}

const displayNumbers = new Intl.NumberFormat('en-US', {
	maximumFractionDigits: 0,
})

export { displayDate, displayDateAndTime, displayNumbers, hEntryDate }
