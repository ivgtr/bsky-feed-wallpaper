import type { NextApiRequest, NextApiResponse } from "next";
import type { AppBskyActorDefs, AppBskyEmbedImages } from "@atproto/api";
import { Agent } from "@/libs/bsky-agent";
import { Posts } from "./post";

export type Author = AppBskyActorDefs.ProfileViewBasic;

export type Image = AppBskyEmbedImages.ViewImage;

export type Images = Image[];

export type APIResponse = {
  posts: Posts;
  cursor: string;
};
