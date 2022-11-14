import "../styles/globals.css";
// import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
