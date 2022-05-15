import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <meta
            name="og:image"
            content="https://res.cloudinary.com/durk-dev/image/upload/v1649913535/takeoff_og_image_uls3xi.png"
          />
          <meta name="robots" content="follow, index" />
          <meta name="theme-color" content="#c7d2fe" />
        </Head>
        <body className="selection:bg-emerald-300 selection:text-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
