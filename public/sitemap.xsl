<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>Sitemap | News47ell</title>
        <meta charset="utf-8"/>
        <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="/styles.css"/>
      </head>

      <body>
        <nav class="container-md markdown-body">
          <p class="bg-yellow-light px-1 py-1 mb-1">
            <strong>This is a sitemap for News47ell.com</strong>.
            <small>It is generated automatically using a script that I wrote in JavaScript.</small>
          </p>
          <p class="text-gray-light">
            Visit <a href="https://www.sitemaps.org/">sitemaps.org</a> for more information about sitemaps.
          </p>
        </nav>
        <hr />
        <header>
          <a class="head_link" target="_blank">
            <xsl:attribute name="href">
              <xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:loc"/>
            </xsl:attribute>
            <img src="/images/brand/feed_banner.png" alt="News47ell" />
          </a>
          <hr />
          <h2 class="border-0 text-white">
              Sitemap
          </h2>
          <p class="text-white">
            <xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:news/sitemap:publication/sitemap:name"/>
          </p>
          <hr />
        </header>
        <xsl:for-each select="/sitemap:urlset/sitemap:url">
          <div class="pb-5">
            <h3 class="mb-0">
              <a target="_blank">
                <xsl:attribute name="href">
                  <xsl:value-of select="sitemap:loc"/>
                </xsl:attribute>
                <xsl:value-of select="sitemap:title"/>
              </a>
            </h3>
            <small class="text-gray-light">
                  Last updated:
              <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
            </small>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>