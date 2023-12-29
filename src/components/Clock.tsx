import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Oswald } from "next/font/google";
import { GithubPicker } from "react-color";

const oswald = Oswald({ subsets: ["latin"] });

export const Clock = ({ color, handleColorChange }: { color: string; handleColorChange: (color: string) => void }) => {
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const [time, setTime] = useState<Date | null>(null);
  const [isShowColorPicker, setIsShowColorPicker] = useState<boolean>(false);
  const timeString = useMemo(() => {
    if (time === null) return "";
    // HH:mm 形式で表示
    return `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;
  }, [time]);

  const colorChange = useCallback((color: { hex: string }) => {
    handleColorChange(color.hex);
    setIsShowColorPicker(false);
  }, []);

  useEffect(() => {
    if (timerRef.current === undefined) {
      setTime(new Date());
    }
    if (timerRef.current !== undefined) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      if (timerRef.current !== undefined) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute flex justify-start left-0 top-0 z-10 w-full">
      {time !== null && (
        <>
          <div
            className="m-4 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsShowColorPicker(true);
            }}
          >
            <p
              className={`text-9xl font-bold ${oswald.className}`}
              style={{
                color,
              }}
            >
              {timeString}
            </p>
            {isShowColorPicker && (
              <GithubPicker
                colors={[
                  "#93c5fd",
                  "#ffbdaf",
                  "#f59898",
                  "#ffce8a",
                  "#f7ea7e",
                  "#abe0c3",
                  "#b08ef0",
                  "#7ea3f7",
                  "#a7e4fc",
                  "#c1f5f5",
                ]}
                onChangeComplete={colorChange}
                styles={{
                  default: {
                    card: {
                      marginTop: "0.5rem",
                      marginLeft: "1rem",
                    },
                  },
                }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
