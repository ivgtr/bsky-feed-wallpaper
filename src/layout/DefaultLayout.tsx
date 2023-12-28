import classNames from "classnames";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className={`flex min-h-screen h-full flex-col items-center justify-between overflow-hidden ${inter.className}`}
    >
      {children}
    </main>
  );
};
