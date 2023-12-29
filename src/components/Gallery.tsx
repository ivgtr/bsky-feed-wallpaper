import type { Posts } from "@/types/post";

import { AuthorCard } from "@/components/AuthorCard";
import { ImageViewer } from "@/components/ImageViewer";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ShortcutObserver } from "./ShortcutObserver";

export const Gallery = ({ posts }: { posts: Posts }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [slideSpeed, setSlideSpeed] = useState<number>(10000);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [postOrder, setPostOrder] = useState<number[]>([]);
  const currentPost = useMemo(() => {
    if (postOrder.length === 0) return null;
    return posts[postOrder[currentIndex]];
  }, [currentIndex, postOrder, posts]);
  const nextPost = useMemo(() => {
    if (postOrder.length === 0) return null;
    if (currentIndex + 1 < postOrder.length) {
      return posts[postOrder[currentIndex + 1]];
    } else {
      return posts[postOrder[0]];
    }
  }, [currentIndex, postOrder, posts]);

  const changeNextPost = useCallback(() => {
    if (postOrder.length === 0) return;
    if (currentIndex + 1 < postOrder.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex, postOrder.length]);

  const changeSlideSpeed = useCallback((speed: number) => {
    setSlideSpeed(speed);
  }, []);

  // 10秒ごとに次の投稿に切り替える
  useEffect(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      changeNextPost();
    }, slideSpeed);

    return () => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
      }
    };
  }, [changeNextPost, slideSpeed]);

  useEffect(() => {
    const order = Array.from({ length: posts.length }, (_, i) => i).sort(() => Math.random() - 0.5);

    setPostOrder(order);
  }, [posts]);

  return (
    <div className="min-h-dvh h-full w-full overflow-hidden" onClick={changeNextPost}>
      {currentPost && nextPost && (
        <>
          <ImageViewer image={currentPost.images[0]} zIndex={1} />
          <ImageViewer image={currentPost.images[0]} zIndex={1} />
          <ImageViewer image={nextPost.images[0]} zIndex={0} />
          <AuthorCard author={currentPost.author} key={currentPost.author.did} />
          <div className="invisible">
            <AuthorCard author={nextPost.author} key={nextPost.author.did} />
          </div>
          <ShortcutObserver changeSlideSpeed={changeSlideSpeed} changeNextPost={changeNextPost} />
        </>
      )}
    </div>
  );
};
