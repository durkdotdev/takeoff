import { ChakraProvider } from "@chakra-ui/react";

// Import Chakra theme and add it to ChakraProvider
import theme from "../theme";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
