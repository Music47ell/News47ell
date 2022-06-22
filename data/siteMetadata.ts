const siteMetadata = {
  title: 'News47ell',
  altTitle: 'NEWS FOR HELL',
  author: 'Ahmet ALMAZ',
  nickname: 'Music47ell',
  position: 'Founder and Editor-in-Chief',
  location: 'Türkiye',
  headerTitle: 'News47ell',
  description: 'Tech news, reviews and interesting links',
  language: 'en-us',
  siteUrl: 'https://www.news47ell.com',
  siteRepo: 'https://github.com/News47ell/website',
  siteLogo: '/static/images/brand/logo.png',
  image: '/images/others/avatar.png',
  socialBanner: '/images/brand/twitter-card.png',
  email: 'ahmet@news47ell.com',
  twitter: 'Music47ell',
  codestats: 'Music47ell',
  trakt: 'Music47ell',
  locale: 'en-US',
  postsPerPages: 10,
  headerNavLinks: [
    { icon: 'BiPen', title: 'Blog', href: '/blog' },
    { icon: 'BiBarChartAlt2', title: 'Dashboard', href: '/dashboard' },
    { icon: 'BiCollection', title: 'Categories', href: '/blog/categories' },
    { icon: 'BiTag', title: 'Tags', href: '/blog/tags' },
    { icon: 'BiArchive', title: 'Archive', href: '/blog/archive' },
    { icon: 'BiBriefcaseAlt2', title: 'Uses', href: '/uses' },
    { icon: 'BiCurrentLocation', title: 'Now', href: '/now' },
  ],
  upperFooterLinks: [
    { href: '/legal', title: 'Legal' },
    { href: '/feed', title: 'RSS' },
    { href: '/acknowledgements', title: 'Acknowledgements' },
  ],
  lowerFooterLinks: [
    { href: 'https://supabase.io/', title: 'Supabase', icon: 'SiSupabase' },
    { href: 'https://nextjs.org/', title: 'Next.js', icon: 'SiNextdotjs' },
    { href: 'https://tailwindcss.com/', title: 'Tailwind CSS', icon: 'SiTailwindcss' },
    { href: 'https://vercel.com/', title: 'Vercel', icon: 'SiVercel' },
  ],
  analytics: {
    umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_SITE_ID,
    umamiScriptUrl: process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL,
  },
  ads: {
    adSense: {
      client: 'ca-pub-7147925438991191',
      adPosition: {
        header: '3800669782',
      },
    },
  },
}

export default siteMetadata
