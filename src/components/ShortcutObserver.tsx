import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

const defaultSpeed = 10000;

export const ShortcutObserver = ({
  changeSlideSpeed,
  changeNextPost,
}: {
  changeSlideSpeed: (speed: number) => void;
  changeNextPost: () => void;
}) => {
  const router = useRouter();

  const hanfleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.push("/");
        return;
      }
      if (event.key === "Enter") {
        changeNextPost();
        return;
      }

      if (event.key === "1") {
        const speed = defaultSpeed;
        changeSlideSpeed(speed);
      } else if (event.key === "2") {
        const speed = Math.floor(defaultSpeed / 2);
        changeSlideSpeed(speed);
      } else if (event.key === "3") {
        const speed = Math.floor(defaultSpeed / 3);
        changeSlideSpeed(speed);
      } else if (event.key === "4") {
        const speed = Math.floor(defaultSpeed / 4);
        changeSlideSpeed(speed);
      } else if (event.key === "5") {
        const speed = Math.floor(defaultSpeed / 5);
        changeSlideSpeed(speed);
      }
    },
    [changeNextPost, changeSlideSpeed, router]
  );

  useEffect(() => {
    document.addEventListener("keydown", hanfleKeyDown);
    return () => {
      document.removeEventListener("keydown", hanfleKeyDown);
    };
  }, [hanfleKeyDown]);

  return null;
};
