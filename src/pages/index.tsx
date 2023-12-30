import { Description } from "@/components/Description";
import { Form } from "@/components/Form";
import { Title } from "@/components/Title";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>HOME — BskyFeedWallpaper</title>
        <meta name="description" content="Blueskyのカスタムフィードに投稿された画像を壁紙っぽく表示します" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="BskyFeedWallpaper" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="HOME — BskyFeedWallpaper" />
        <meta property="og:description" content="Blueskyのカスタムフィードに投稿された画像を壁紙っぽく表示します" />
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
