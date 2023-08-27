import { writeFileSync } from "fs";
import path from 'path'
//import prettier from "prettier";
import { allBlogs } from "../.contentlayer/generated/index.mjs";
import { allPages } from "../.contentlayer/generated/index.mjs";

import { escape, siteMetadata } from "./index.mjs";

export default async function generateSitemap() {
  const generateUrl = (siteMetadata, item) => {
    const urlPrefix = item.type === "Blog" ? "/blog/" : "/";
    return `
            <url>
                <loc>${siteMetadata.siteUrl}${urlPrefix}${item.slug}</loc>
                <title>${escape(item.title)}</title>
                <lastmod>${item.updated_at.split('T')[0]}</lastmod>
            </url>
        `;
  };

  const generateSitemap = (siteMetadata, items) => `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet href="/sitemap.xsl" type="text/xsl"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <description>${escape(siteMetadata.description)}</description>
    ${items.map((post) => generateUrl(siteMetadata, post)).join("")}
  </urlset>
`;

  const routes = ['', 'blog', 'dashboard'].map((route) => ({
    title: route === '' ? 'Home' :
      route.charAt(0).toUpperCase() + route.slice(1),
    slug: route,
    updated_at: new Date().toISOString(),
  }));
  const posts = allBlogs.filter((post) => !(post.draft === true)).sort((a, b) => (a.published_at > b.published_at ? -1 : 1));
  const pages = allPages.filter((page) => !(page.draft === true)).sort((a, b) => (a.published_at > b.published_at ? -1 : 1));

  const items = [...routes, ...pages, ...posts];

  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  const sitemap = generateSitemap(siteMetadata, items);
  writeFileSync(sitemapPath, sitemap);
}