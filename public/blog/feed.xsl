<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  version="3.0"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>RSS Feed | <xsl:value-of select="/rss/channel/title" /></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
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
        class="bg-draculaBg text-draculaTc font-sans text-base leading-6 text-gray-700 max-w-[60ch] mx-auto p-2"
      >
        <nav class="container mx-auto py-4">
          <div class="bg-yellow-200 px-4 py-2 mb-2">
            <p>
              <strong>This is a web feed,</strong> also known as an RSS feed.
            </p>
            <p>
              <small>Subscribe by copying the URL from the address bar into your
                newsreader.</small>
            </p>
          </div>
          <p class="text-gray-500">
            Visit
            <a class="text-draculaLc" href="https://aboutfeeds.com">About Feeds</a>
            to get started with newsreaders and subscribing. It's free.
          </p>
        </nav>
        <header class="mx-auto max-w-2xl">
          <a target="_blank">
            <xsl:attribute name="href">
              <xsl:value-of select="/rss/channel/link" />
            </xsl:attribute>
            <img src="/images/brand/feed_banner.png" alt="News47ell" />
          </a>
          <hr class="my-4" />
          <h2 class="border-0 text-white flex items-center">
            <xsl:value-of select="/rss/channel/title" /> RSS Feed
          </h2>
          <p class="text-white">
            <xsl:value-of select="/rss/channel/description" />
          </p>
          <hr class="my-4" />
        </header>
        <xsl:for-each select="/rss/channel/item">
          <div class="pb-5">
            <h3 class="mb-0 text-2xl font-semibold">
              <a class="text-draculaLc" target="_blank">
                <xsl:attribute name="href">
                  <xsl:value-of select="link" />
                </xsl:attribute>
                <xsl:value-of select="title" />
              </a>
            </h3>
            <small class="text-gray-500">
              Published: <xsl:value-of select="pubDate" />
            </small>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
  <auto-scroll xmlns="http://www.w3.org/1999/xhtml"></auto-scroll>
</xsl:stylesheet>
