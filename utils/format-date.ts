import siteMetadata from '@/data/siteMetadata'

const formatDate = (date: string) => {
	const options: Intl.DateTimeFormatOptions = {
		dateStyle: 'medium',
		timeStyle: 'short',
		hour12: false,
	}
	const now = new Date(date).toLocaleString(siteMetadata.locale, options)

	return now
}

export default formatDate
