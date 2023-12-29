import { useEffect, useMemo, useRef, useState } from "react";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"] });

export const Clock = () => {
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const [time, setTime] = useState<Date | null>(null);
  const timeString = useMemo(() => {
    if (time === null) return "";
    // HH:mm 形式で表示
    return `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;
  }, [time]);

  useEffect(() => {
    if (time === null) {
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
      {time !== null && <div className={`text-9xl text-blue-300 font-bold ${oswald.className} m-4`}>{timeString}</div>}
    </div>
  );
};
