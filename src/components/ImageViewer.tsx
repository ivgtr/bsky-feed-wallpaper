import { Images } from "@/types/api";
import Image from "next/image";

export const ImageViewer = ({ images, zIndex }: { images: Images; zIndex: number }) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full block bg-slate-400"
      style={{
        zIndex,
      }}
    >
      {images.map((image, index) => (
        <div key={index} className="absolute top-0 left-0 w-full h-full block">
          <Image
            src={image.fullsize}
            width={image.aspectRatio?.width}
            height={image.aspectRatio?.height}
            alt={image.alt}
            className="object-contain w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};
