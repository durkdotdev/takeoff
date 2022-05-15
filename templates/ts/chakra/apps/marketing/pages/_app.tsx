import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

// Import Chakra theme and add it to ChakraProvider
import theme from "../theme";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
