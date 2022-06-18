import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head></Head>
        <body className="antialiased transition-colors duration-300 text-main bg-main">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
