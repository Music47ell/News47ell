import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head></Head>
        <body className="antialiased text-nfh-text-primary bg-nfh-background-primary transition-colors duration-300">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
