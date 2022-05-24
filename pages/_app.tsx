import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { connectAuthEmulator } from "firebase/auth";
import { connectStorageEmulator } from "firebase/storage";
import { authentication } from "../firebase/app";
import { storage } from "../firebase/app";

connectAuthEmulator(authentication, "http://localhost:9099");
connectStorageEmulator(storage, "localhost", 9199);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
