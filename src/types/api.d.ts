import type { NextApiRequest, NextApiResponse } from "next";
import type { AppBskyActorDefs, AppBskyEmbedImages } from "@atproto/api";
import { Agent } from "@/libs/bsky-agent";

export type Author = AppBskyActorDefs.ProfileViewBasic;

export type Image = AppBskyEmbedImages.ViewImage;

export type Images = Image[];

export type Post = {
  uri: string;
  author: Author;
  images: Images;
};

export type Posts = Post[];

export type APIResponse = {
  posts: Posts;
  cursor: string;
};
