import { Description } from "@/components/Description";
import { Form } from "@/components/Form";
import { Title } from "@/components/Title";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>HOME — BskyFeedWallpaper</title>
        <meta name="description" content="bsky Feed wallpaper" />
      </Head>

      <div className="min-h-screen w-full px-4">
        <div className="flex flex-col items-center justify-center gap-8 first:mt-8">
          <Title />
          <div className="mt-8">
            <Form />
          </div>
          <Description />
        </div>
      </div>
    </>
  );
}
