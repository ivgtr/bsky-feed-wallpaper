import type { Image, Author } from "./api";

export type Post = {
  uri: string;
  author: Author;
  images: Image[];
};

export type Posts = Post[];

export type FlatPost = Pick<Post, "uri" | "author"> & {
  image: Image;
};
