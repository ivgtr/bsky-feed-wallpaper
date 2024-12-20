// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { APIResponse, Image } from "@/types/api";

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

    let did: string;

    if (handle.startsWith("did:")) {
      did = handle;
    } else {
      const didData = await _agent.getDid(handle);
      if (!didData) {
        res.status(404).end('{"message": "ユーザーが見つかりませんでした。"}');
        return;
      }
      did = didData.did;
    }

    const { BSKY_IDENTIFIER, BSKY_APP_PASSWORD } = process.env;

    await _agent.login(BSKY_IDENTIFIER!, BSKY_APP_PASSWORD!);

    const uri = "at://" + did + "/app.bsky.feed.generator/" + id;

    const data = await _agent.getFeedTimeline({
      limit: 100,
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

    const pickedPosts = posts
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
        const images = post.post?.embed?.images as Image[];
        const labels = post.post?.labels || [];

        return {
          uri,
          author,
          images,
          labels,
        };
      });

    res.status(200).json({ posts: pickedPosts, cursor });
  } catch (e) {
    res.status(404).end('{"message": "不明なエラーが発生しました。"}');
  }
}
