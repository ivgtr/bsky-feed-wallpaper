import type { Label } from "@atproto/api";
import type { Image, Author } from "./api";

export type Post = {
  uri: string;
  author: Author;
  images: Image[];
  labels: Label[];
};

export type Posts = Post[];

export type FlatPost = Pick<Post, "uri" | "author" | "labels"> & {
  image: Image;
};
