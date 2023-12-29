import { Author } from "@/types/api";
import Image from "next/image";

export const AuthorCard = ({ author }: { author: Author }) => {
  return (
    <div className="absolute flex justify-end left-0 bottom-0 z-10 w-full">
      <a
        className="group transition max-w-96 w-full flex flex-row items-center justify-center gap-4 m-4 p-4 md:p-6 rounded-md bg-blue-300 hover:bg-blue-400 shadow-sm hover:shadow-xl"
        href={`https://bsky.app/profile/${author.handle}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-16 h-16 lg:w-24 lg:h-24">
          <div className="rounded-full w-full h-full overflow-hidden">
            {author.avatar ? (
              <Image src={author.avatar} alt={author.displayName || ""} fill className="object-contain !relative" />
            ) : (
              <div className="rounded-full w-full h-full bg-gray-300" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <p className="w-full text-lg md:text-xl font-medium text-left text-white group-hover:underline leading-5">
            {author.displayName}
          </p>
          <p className="w-full text-xs md:text-sm font-medium text-left text-white group-hover:underline">
            {author.handle}
          </p>
        </div>
      </a>
    </div>
  );
};
