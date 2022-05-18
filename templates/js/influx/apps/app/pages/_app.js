import "tailwindcss/tailwind.css";
import "influx-ui/influx-ui.css";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
