import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <NextNProgress color="#000" />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
