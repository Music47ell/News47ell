import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'

const Umami = (): JSX.Element => {
  return (
    <>
      <Script
        async
        defer
        data-website-id={siteMetadata.analytics.umamiWebsiteId}
        src={siteMetadata.analytics.umamiScriptUrl}
        data-do-not-track="true"
      />
    </>
  )
}

export default Umami
