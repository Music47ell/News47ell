import siteMetadata from '@/data/siteMetadata'

const formatDate = (date: string) => {
	// convert date and time to be valid ISO-8601
	const isoDate = new Date(date).toISOString()
	// format date to be locale specific
	const formattedDate = new Date(isoDate).toLocaleDateString(siteMetadata.locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
	return formattedDate
}

export default formatDate
