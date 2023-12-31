import type { NextApiRequest, NextApiResponse } from "next";
import type { AppBskyActorDefs, AppBskyEmbedImages } from "@atproto/api";
import type { Posts } from "./post";

export type Author = AppBskyActorDefs.ProfileViewBasic;

export type Image = AppBskyEmbedImages.ViewImage;

export type APIResponse = {
  posts: Posts;
  cursor: string;
};
