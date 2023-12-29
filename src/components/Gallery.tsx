import type { Posts } from "@/types/post";

import { AuthorCard } from "@/components/AuthorCard";
import { ImageViewer } from "@/components/ImageViewer";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ShortcutObserver } from "./ShortcutObserver";
import { Clock } from "./Clock";

export const Gallery = ({ posts }: { posts: Posts }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [slideSpeed, setSlideSpeed] = useState<number>(10000);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isShowClock, setIsShowClock] = useState<boolean>(false);
  const [isShowAuthor, setIsShowAuthor] = useState<boolean>(true);
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

  const toggleIsPlaying = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const toggleIsShowClock = useCallback(() => {
    setIsShowClock((prev) => !prev);
  }, []);

  const toggleIsShowAuthor = useCallback(() => {
    setIsShowAuthor((prev) => !prev);
  }, []);

  useEffect(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
    }
    if (!isPlaying) return;
    timerRef.current = setTimeout(() => {
      changeNextPost();
    }, slideSpeed);

    return () => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
      }
    };
  }, [changeNextPost, slideSpeed, isPlaying]);

  useEffect(() => {
    const order = Array.from({ length: posts.length }, (_, i) => i).sort(() => Math.random() - 0.5);

    setPostOrder(order);
  }, [posts]);

  return (
    <div className="min-h-dvh h-full w-full overflow-hidden" onClick={changeNextPost}>
      {currentPost && nextPost && (
        <>
          <ImageViewer image={currentPost.images[0]} zIndex={1} />
          <ImageViewer image={nextPost.images[0]} zIndex={0} />
          {isShowAuthor && <AuthorCard author={currentPost.author} key={currentPost.author.did} />}
          {isShowClock && <Clock />}
          <ShortcutObserver
            changeSlideSpeed={changeSlideSpeed}
            changeNextPost={changeNextPost}
            toggleIsPlaying={toggleIsPlaying}
            toggleIsShowClock={toggleIsShowClock}
            toggleIsShowAuthor={toggleIsShowAuthor}
          />
        </>
      )}
    </div>
  );
};
