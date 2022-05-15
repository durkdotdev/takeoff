import "tailwindcss/tailwind.css";
import "../styles/index.css";

import type { AppProps } from "next/app";

import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
