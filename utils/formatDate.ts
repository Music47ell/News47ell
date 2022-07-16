import siteMetadata from '@/data/siteMetadata'

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
  const now = new Date(date).toLocaleTimeString(siteMetadata.locale, options)

  return now
}

export default formatDate
