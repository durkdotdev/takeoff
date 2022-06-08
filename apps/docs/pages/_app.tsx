import "tailwindcss/tailwind.css";
import "../styles/index.css";

import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";

import AnchorHeading from "../components/AnchorHeading";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <MDXProvider
      components={{
        h2: (props) => <AnchorHeading type="h2" {...props} />,
        h3: (props) => <AnchorHeading type="h3" {...props} />,
        Link
      }}
    >
      <Component {...pageProps} />
    </MDXProvider>
  );
}
