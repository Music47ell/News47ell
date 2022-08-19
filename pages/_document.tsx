import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-nfh-background-primary text-nfh-text-primary antialiased transition-colors duration-300">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
