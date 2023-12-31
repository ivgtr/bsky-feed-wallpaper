import { Author } from "@/types/api";

export const AuthorCard = ({ author, color }: { author: Author; color: string }) => {
  return (
    <div className="absolute flex justify-end left-0 bottom-0 z-10 w-full">
      <a
        className="relative group transition max-w-96 w-full flex flex-row items-center justify-center gap-4 m-4 p-4 md:p-6 rounded-md mix-blend-multiply hover:mix-blend-overlay shadow-sm hover:shadow-xl after:absolute after:left-0 after:top-0 after:w-full after:h-full after:z-0 after:rounded-md after:transition after:bg-white after:opacity-10 after:shadow-sm after:hover:opacity-20 after:hover:shadow-xl"
        href={`https://bsky.app/profile/${author.handle}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          backgroundColor: color,
        }}
      >
        <div className="w-16 h-16 lg:w-24 lg:h-24">
          <div className="transition rounded-full w-full h-full overflow-hidden shadow-sm">
            {author.avatar ? (
              <img src={author.avatar} alt={author.handle} className="object-contain !relative" />
            ) : (
              <div className="rounded-full w-full h-full bg-gray-300" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <p className="transition w-full text-lg md:text-xl font-medium text-left text-white group-hover:underline leading-5">
            {author.displayName}
          </p>
          <p className="transition w-full text-xs md:text-sm font-medium text-left text-white group-hover:underline">
            {author.handle}
          </p>
        </div>
      </a>
    </div>
  );
};
