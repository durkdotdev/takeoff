import "tailwindcss/tailwind.css";
import "../styles/index.css";

import { MDXProvider } from "@mdx-js/react";
import { AnchorHeading } from "ui";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <MDXProvider
      components={{
        h2: (props) => <AnchorHeading type="h2" {...props} />,
        h3: (props) => <AnchorHeading type="h3" {...props} />
      }}
    >
      <Component {...pageProps} />
    </MDXProvider>
  );
}
