import "tailwindcss/tailwind.css";
// influx development
import "influx-ui/influx-ui.css";

import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

import { tailwindPreflight } from "../styles/tailwind-preflight";
import theme from "../theme";

const uiOptions = ["chakra", "daisy", "influx", "tailwind", "unstyled"];

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const path = router.asPath;
    for (const ui of uiOptions) {
      if (path.includes(ui)) return window.sessionStorage.setItem("lastUI", ui);
    }
    const lastUI = window.sessionStorage.getItem("lastUI");
    Router.push(`/${lastUI ? lastUI : "unstyled"}${path}`);
  }, [router.asPath]);

  return (
    <>
      {router.pathname.includes("chakra") ? (
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      ) : router.pathname.includes("daisy") ||
        router.pathname.includes("influx") ||
        router.pathname.includes("tailwind") ? (
        <ThemeProvider
          attribute="class"
          default="system"
          storageKey="nightwind-mode"
        >
          <style jsx global>
            {tailwindPreflight}
          </style>
          <style jsx global>
            {`
              * {
                font-family: ui-sans-serif, system-ui, -apple-system,
                  BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
                  Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
                  "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
              }
            `}
          </style>
          <Component {...pageProps} />
        </ThemeProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
};

export default MyApp;
