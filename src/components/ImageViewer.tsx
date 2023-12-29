import type { Image } from "@/types/api";

export const ImageViewer = ({ image, zIndex }: { image: Image; zIndex: number }) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-slate-400 grid grid-cols-1"
      style={{
        zIndex,
      }}
    >
      <div className="absolute w-full h-full block overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-30">
          <img src={image.fullsize} alt={image.alt} className="object-contain w-full h-full z-20" />
        </div>
        <div className="w-full h-full bg-black opacity-30 z-10"></div>
        <div className="absolute inset-0 w-full h-full">
          <img src={image.fullsize} alt={image.alt} className="object-cover w-full h-full blur-sm" />
        </div>
      </div>
    </div>
  );
};
