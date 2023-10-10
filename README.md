![tailwind-nextjs-banner](/public/images/brand/news47ell_repo.png)

# news47ell.com

[![GitHub Repo stars](https://img.shields.io/github/stars/Music47ell/News47ell?style=social)](https://GitHub.com/Music47ell/News47ell/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/Music47ell/News47ell?style=social)](https://GitHub.com/Music47ell/News47ell/network/)

[![GitHub Url](https://img.shields.io/github/followers/Music47ell?style=social)](https://github.com/Music47ell/)
[![Twitter URL](https://img.shields.io/twitter/follow/Music47ell?style=social)](https://twitter.com/music47ell)
[![Twitter URL](https://img.shields.io/twitter/follow/News47ell?style=social)](https://twitter.com/news47ell)

## Stack

- `Next.js` - A React framework for building server-side rendered and static web applications.
- `TypeScript` - A typed superset of JavaScript that compiles to plain JavaScript.
- `Tailwind CSS` - A utility-first CSS framework for rapidly building custom user interfaces.
- `Drizzle ORM` - A lightweight and simple ORM for Node.js that supports multiple databases.
- `Turso` - A Fast, Easy and Cheap Database.
- `Vercel` - A cloud platform for static sites and serverless functions.


## Overview

- `app/*` - All other static pages.
- `app/blog/*` - Static pre-rendered blog pages using markdown.
- `data/*` - TS/JSON data that is used for resume and site settings/info.
- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `public/*` - Static assets including fonts and images.
- `styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.

## Features

- Easy styling customization with [Tailwind](https://tailwindcss.com/)
- Lightweight
- Mobile-friendly view
- Uses [Turso](https://turso.tech/) for post views
- Automatic image optimization via [next/image](https://nextjs.org/docs/basic-features/image-optimization)
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
