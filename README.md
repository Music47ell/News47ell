![tailwind-nextjs-banner](/public/images/brand/news47ell_repo.png)

# news47ell.com

[![GitHub Repo stars](https://img.shields.io/github/stars/Music47ell/News47ell?style=social)](https://GitHub.com/Music47ell/News47ell/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/Music47ell/News47ell?style=social)](https://GitHub.com/Music47ell/News47ell/network/)

[![GitHub Url](https://img.shields.io/github/followers/Music47ell?style=social)](https://github.com/Music47ell/)
[![Twitter URL](https://img.shields.io/twitter/follow/Music47ell?style=social)](https://twitter.com/music47ell)
[![Twitter URL](https://img.shields.io/twitter/follow/News47ell?style=social)](https://twitter.com/news47ell)

## Stack

[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

## Overview

- `data/*` - TS/JSON data that is used for resume and site settings/info.
- `layouts/*` - The different layouts used for home page, blog posts, pages, etc.
- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `pages/api/*` - [API Routes](https://nextjs.org/docs/api-routes/introduction) powering [`/dashboard`](https://www.news47ell.com/dashboard), post views, tv shows, movies and music.
- `pages/blog/*` - Static pre-rendered blog pages using markdown.
- `pages/dashboard` - [Personal dashboard](https://www.news47ell.com/dashboard) tracking metrics.
- `pages/*` - All other static pages.
- `prisma/*` - My Prisma schema, which uses a PlanetScale MySQL database.
- `public/*` - Static assets including fonts and images.
- `styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.

## Features

- Easy styling customization with [Tailwind 3.0](https://tailwindcss.com/blog/tailwindcss-v3) and primary color attribute
- Lightweight, uses Preact in production build
- Mobile-friendly view
- Multiple themes
- Sound effects
- Uses [Supabase](https://supabase.com/) for postgres database and authentication
- Uses [PlanetScale](https://planetscale.com/) and [Prisma](https://www.prisma.io/) for analytics
- Automatic image optimization via [next/image](https://nextjs.org/docs/basic-features/image-optimization)
- Support for tags - each unique tag will be its own page
- Support for multiple authors
- Blog templates
- Support for nested routing of blog posts
- Projects page
- Pre-configured security headers
- SEO friendly with RSS feed, sitemaps and more!

## Running Locally

```bash
$ git clone https://github.com/Music47ell/News47ell.git
$ cd News47ell
$ npm
$ npm run dev
```

Create a `.env` file similar to [`.env.example`](https://github.com/Music47ell/News47ell/blob/main/.env.example).

## Cloning / Forking

Please review the [license](https://github.com/Music47ell/News47ell/blob/main/LICENSE) and remove all of my personal information (resume, blog posts, images, etc.).
