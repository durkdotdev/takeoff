import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
// Use next-themes to handle light/dark mode in conjunction with Tailwind
// GitHub: https://github.com/pacocoursey/next-themes
import { ThemeProvider } from "next-themes";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <ThemeProvider default="system">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
