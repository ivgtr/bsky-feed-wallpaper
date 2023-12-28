import { Gallery } from "@/components/Gallery";
import type { APIResponse, Posts } from "@/types/api";
import type { GetServerSideProps } from "next";
import Link from "next/link";

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
  return (
    <>
      {posts.length > 0 ? (
        <Gallery posts={posts} />
      ) : (
        <div className="min-h-screen h-full flex flex-wrap items-center justify-center">
          <p>投稿がありません</p>
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
