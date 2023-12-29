import { Gallery } from "@/components/Gallery";
import type { APIResponse } from "@/types/api";
import type { FlatPost, Posts } from "@/types/post";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";

export const getServerSideProps: GetServerSideProps<{ posts: Posts }, { handle: string; id: string }> = async (
  context
) => {
  try {
    const { handle, id } = context.params!;
    const base_url = process.env.NEXT_PUBLIC_BASE_URL || "";
    const url = `${base_url}/api/profile/${handle}/feed/${id}`;
    const { posts } = await fetch(encodeURI(url))
      .then<APIResponse>((res) => res.json())
      .catch(() => {
        return { posts: [] };
      });

    return { props: { posts } };
  } catch (_error) {
    return { props: { posts: [] } };
  }
};

export default function Home({ posts }: { posts: Posts }) {
  const flatPosts = useMemo(() => {
    const _flatPosts: FlatPost[] = [];
    posts.forEach((post) => {
      post.images.forEach((image) => {
        _flatPosts.push({ ...post, image });
      });
    });
    return _flatPosts;
  }, [posts]);

  return (
    <>
      <Head>
        <title>Gallery — BskyFeedWallpaper</title>
        <meta name="description" content="BlueSkyのカスタムフィードに投稿された画像を壁紙っぽく表示します" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="BskyFeedWallpaper" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Gallery — BskyFeedWallpaper" />
        <meta property="og:description" content="BlueSkyのカスタムフィードに投稿された画像を壁紙っぽく表示します" />
        <meta name="robots" content="noindex"></meta>
      </Head>

      {flatPosts.length > 0 ? (
        <Gallery posts={flatPosts} />
      ) : (
        <div className="min-h-screen h-full flex flex-wrap flex-col items-center justify-center gap-8">
          <p>画像を含む投稿が存在しないか、フィードの取得に失敗しました。</p>

          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            戻る
          </Link>
        </div>
      )}
    </>
  );
}
