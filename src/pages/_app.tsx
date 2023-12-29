import { DefaultLayout } from "@/layout/DefaultLayout";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
      <Analytics />
    </DefaultLayout>
  );
}
