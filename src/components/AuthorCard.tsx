import { Author } from "@/types/api";
import Image from "next/image";

export const AuthorCard = ({ author }: { author: Author }) => {
  return (
    <div className="absolute bottom-4 right-4 z-10">
      <a
        className="group transition flex flex-col lg:flex-row items-center justify-center gap-4 bg-blue-300 hover:bg-blue-400 p-8 rounded-md shadow-sm hover:shadow-xl"
        href={`https://bsky.app/profile/${author.handle}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-24 h-24">
          <div className="rounded-full w-full h-full overflow-hidden">
            {author.avatar ? (
              <Image src={author.avatar} alt={author.displayName || ""} fill className="object-contain !relative" />
            ) : (
              <div className="rounded-full w-full h-full bg-gray-300" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <p className="w-full text-xl font-medium text-center lg:text-left text-white group-hover:underline">
            {author.displayName}
          </p>
          <p className="w-full text-sm font-medium text-center lg:text-left text-white group-hover:underline">
            {author.handle}
          </p>
        </div>
      </a>
    </div>
  );
};
