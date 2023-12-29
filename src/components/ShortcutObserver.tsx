import { useCallback, useEffect, useState } from "react";

const defaultSpeed = 10000;

export const ShortcutObserver = ({
  changeSlideSpeed,
  changeNextPost,
  toggleIsPlaying,
}: {
  changeSlideSpeed: (speed: number) => void;
  changeNextPost: () => void;
  toggleIsPlaying: () => void;
}) => {
  const hanfleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === " ") {
        toggleIsPlaying();
        return;
      }
      if (event.key === "Enter") {
        changeNextPost();
        return;
      }

      if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key)) {
        const speed = Math.floor(defaultSpeed / Number(event.key));
        changeSlideSpeed(speed);
        return;
      }
    },
    [changeNextPost, changeSlideSpeed, toggleIsPlaying]
  );

  useEffect(() => {
    document.addEventListener("keydown", hanfleKeyDown);
    return () => {
      document.removeEventListener("keydown", hanfleKeyDown);
    };
  }, [hanfleKeyDown]);

  return null;
};
