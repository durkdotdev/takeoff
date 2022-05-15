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
    // Use attribute="class" to work with Tailwind
    // Use storageKey="nightwind-mode" to automatically generate dark mode
    // GitHub: https://github.com/jjranalli/nightwind
    <ThemeProvider
      attribute="class"
      default="system"
      storageKey="nightwind-mode"
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
