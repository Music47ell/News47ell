<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
  version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>Sitemap | News47ell</title>
        <meta charset="utf-8" />
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  draculaLc: "#E30A17",
                  draculaTc: "#282a36",
                  draculaBg: "#282a36",
                },
              },
            },
          };
        </script>
      </head>

      <body
        class="bg-draculaBg text-draculaTc font-sans text-base leading-6 text-zinc-700 max-w-[60ch] mx-auto p-2"
      >
        <nav class="container mx-auto py-4">
          <div class="bg-yellow-200 px-4 py-2 mb-2">
            <p>
              <strong>This is a sitemap for News47ell.com</strong>
            </p>
            <p>
              <small
                >It is generated automatically using a script that I wrote in
                JavaScript.</small
              >
            </p>
          </div>
          <p class="text-zinc-500">
            Visit
            <a href="https://www.sitemaps.org/" class="text-draculaLc"
              >sitemaps.org</a
            >
            for more information about sitemaps.
          </p>
        </nav>
        <header class="mx-auto max-w-2xl">
          <a target="_blank">
            <xsl:attribute name="href">
              <xsl:value-of
                select="sitemap:urlset/sitemap:url[1]/sitemap:loc"
              />
            </xsl:attribute>
            <img src="/images/brand/feed_banner.png" alt="News47ell" />
          </a>
          <hr class="my-4" />
          <h2 class="border-0 text-white flex items-center">
            News47ell Sitemap
          </h2>
          <p class="text-white">
            <xsl:value-of select="sitemap:urlset/sitemap:description" />
          </p>
          <hr class="my-4" />
        </header>
        <xsl:for-each select="/sitemap:urlset/sitemap:url">
          <div class="pb-5">
            <h3 class="mb-0 text-2xl font-semibold">
              <a class="text-draculaLc" target="_blank">
                <xsl:attribute name="href">
                  <xsl:value-of select="sitemap:loc" />
                </xsl:attribute>
                <xsl:value-of select="sitemap:loc" />
              </a>
            </h3>
            <small class="text-zinc-500">
              Last updated:
              <xsl:value-of select="substring(sitemap:lastmod, 1, 10)" />
            </small>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
