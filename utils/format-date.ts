import siteMetadata from '@/data/siteMetadata'

const displayDate = (date: string) => {
	// human-readable date and time for display purposes (e.g. blog posts)
	const options: Intl.DateTimeFormatOptions = {
		dateStyle: 'medium',
		timeStyle: 'short',
		hour12: true,
	}
	const now = new Date(date).toLocaleString(siteMetadata.locale, options)

	return now
}

const hEntryDate = (date: string) => {
	// ISO8601 machine-readable datetime for h-entry microformat (https://indieweb.org/h-entry)
	const now = new Date(date).toISOString()

	return now
}

export { displayDate, hEntryDate }
