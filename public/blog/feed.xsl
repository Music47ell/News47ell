<!--

# Pretty Feed

Styles an RSS/Atom feed, making it friendly for humans viewers, and adds a link
to aboutfeeds.com for new user onboarding. See it in action:

   https://interconnected.org/home/feed


## Credits

pretty-feed is based on work by lepture.com:

   https://lepture.com/en/2019/rss-style-with-xsl

This current version is maintained by aboutfeeds.com:

   https://github.com/genmon/aboutfeeds

-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" version="3.0">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en">

        <head>
            <title>
                News47ell RSS Feed |
                <xsl:value-of select="/rss/channel/title" />
            </title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
            <style type="text/css">
            *{box-sizing:border-box}html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";font-size:14px;line-height:1.5;color:#24292e;background-color:#282a36;max-width:60ch;margin:auto;padding:8px}.markdown-body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";font-size:16px;line-height:1.5;word-wrap:break-word}.markdown-body::before,.markdown-body::after{display:table;content:""}.container-md{max-width:768px;margin-right:auto;margin-left:auto}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section{display:block}a{color:#ff5555;text-decoration:none}img{max-width:100%;border-style:none}.rule,hr{height:0;margin:15px 0;overflow:hidden;background:0 0;border:0;border-bottom:1px solid #dfe2e5;box-sizing:content-box}.text-white{color:#fff!important}.border-0{border:0!important}h2{font-size:24px;font-weight:600}h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:0}.pb-5{padding-bottom:32px!important}.mb-0{margin-bottom:0!important}h3{font-size:20px;font-weight:600}.text-gray-light{color:#6a737d!important}small{font-size:90%}.markdown-body blockquote,.markdown-body dl,.markdown-body ol,.markdown-body p,.markdown-body pre,.markdown-body table,.markdown-body ul{margin-top:0;margin-bottom:16px}.py-1{padding-top:4px!important;padding-bottom:4px!important}.px-1{padding-right:4px!important;padding-left:4px!important}.mb-1{margin-bottom:4px!important}.bg-yellow-light{background-color:#fff5b1!important}p{margin-top:0;margin-bottom:10px}.markdown-body>*:first-child{margin-top:0!important}.markdown-body>*:last-child{margin-bottom:0!important}b,strong{font-weight:600}.b,strong{font-weight:bolder}.b{font-weight:600}.strong{font-weight:bolder}
            </style>
        </head>

        <body>
        <nav class="container-md markdown-body">
          <p class="bg-yellow-light px-1 py-1 mb-1">
            <strong>This is a web feed,</strong> also known as an RSS feed. <strong>Subscribe</strong> by copying the URL from the address bar into your newsreader.
          </p>
          <p class="text-gray-light">
            Visit <a href="https://aboutfeeds.com">About Feeds</a> to get started with newsreaders and subscribing. It’s free.
          </p>
        </nav>
        <header>
            <a class="head_link" target="_blank">
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link"/>
              </xsl:attribute>
              <img src="/images/brand/feed_banner.png" alt="News47ell" />
            </a>
            <hr />
            <h2 class="border-0 text-white">
            <!-- https://commons.wikimedia.org/wiki/File:Feed-icon.svg -->
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="vertical-align: text-bottom; width: 1.2em; height: 1.2em;" class="pr-1" id="RSSicon" viewBox="0 0 256 256">
                <defs>
                  <linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg">
                    <stop  offset="0.0" stop-color="#E3702D"/><stop  offset="0.1071" stop-color="#EA7D31"/>
                    <stop  offset="0.3503" stop-color="#F69537"/><stop  offset="0.5" stop-color="#FB9E3A"/>
                    <stop  offset="0.7016" stop-color="#EA7C31"/><stop  offset="0.8866" stop-color="#DE642B"/>
                    <stop  offset="1.0" stop-color="#D95B29"/>
                  </linearGradient>
                </defs>
                <rect width="256" height="256" rx="55" ry="55" x="0"  y="0"  fill="#CC5D15"/>
                <rect width="246" height="246" rx="50" ry="50" x="5"  y="5"  fill="#F49C52"/>
                <rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg)"/>
                <circle cx="68" cy="189" r="24" fill="#FFF"/>
                <path d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z" fill="#FFF"/>
                <path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z" fill="#FFF"/>
              </svg>
              <xsl:value-of select="/rss/channel/title"/>
              </h2>
            <p class="text-white"><xsl:value-of select="/rss/channel/description"/></p>
            <hr />
          </header>
             <h2 class="text-white">Recent Items</h2>
          <xsl:for-each select="/rss/channel/item">
            <div class="pb-5">
              <h3 class="mb-0">
                <a target="_blank">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
              </h3>
              <small class="text-gray-light">
                Published: <xsl:value-of select="pubDate" />
              </small>
            </div>
          </xsl:for-each>
        </body>

        </html>
    </xsl:template>
    <auto-scroll xmlns="http://www.w3.org/1999/xhtml"></auto-scroll>
</xsl:stylesheet>
