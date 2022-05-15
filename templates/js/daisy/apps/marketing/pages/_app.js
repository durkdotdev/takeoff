import "tailwindcss/tailwind.css";

// Use next-themes to handle light/dark mode in conjunction with Tailwind
// GitHub: https://github.com/pacocoursey/next-themes
import { ThemeProvider } from "next-themes";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ThemeProvider default="system">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
