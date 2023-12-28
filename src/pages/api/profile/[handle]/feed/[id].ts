// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { APIResponse, Image, Images } from "@/types/api";

import { Agent } from "@/libs/bsky-agent";

export default async function handler(
  req: NextApiRequest & {
    query: {
      handle: string;
      id: string;
    };
  },
  res: NextApiResponse<APIResponse>
) {
  const { handle, id } = req.query;

  if (!handle || !id) {
    res.status(404).end('{"message": "不正なリクエストです。"}');
    return;
  }

  try {
    const _agent = new Agent();

    const { BSKY_IDENTIFIER, BSKY_APP_PASSWORD } = process.env;

    await _agent.login(BSKY_IDENTIFIER!, BSKY_APP_PASSWORD!);

    const uri = "at://" + handle + "/app.bsky.feed.generator/" + id;

    const data = await _agent.getFeedTimeline({
      limit: 20,
      cursor: "",
      feed: uri,
    });

    if (data === undefined) {
      res
        .status(404)
        .end('{"message": "Feedが見つからない、もしくはFeedの取得に失敗しました。\n時間を置いて再度お試しください。"}');
      return;
    }

    const cursor = data.cursor || "";
    const posts = data.feed;

    const pickePosts = posts
      .filter((post) => {
        // 画像がないものは除外
        if (!post.post?.embed?.images) {
          return false;
        }
        return true;
      })
      .map((post) => {
        const uri = post.post.uri;
        const author = post.post.author;
        const images = post.post?.embed?.images as Images;

        return {
          uri,
          author,
          images,
        };
      });

    res.status(200).json({ posts: pickePosts, cursor });
  } catch (e) {
    console.error("API Request Failed");
    console.error(e);
    res.status(404).end('{"message": "不明なエラーが発生しました。"}');
  }
}
