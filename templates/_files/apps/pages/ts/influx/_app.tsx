import "tailwindcss/tailwind.css";
import "influx-ui/influx-ui.css";

import type { AppProps } from "next/app";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
