import { Form } from "@/components/Form";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>HOME — BskyFeedWallpaper</title>
        <meta name="description" content="bsky Feed wallpaper" />
      </Head>

      <div className="min-h-screen h-full flex flex-wrap items-center justify-center">
        <Form />
      </div>
    </>
  );
}
