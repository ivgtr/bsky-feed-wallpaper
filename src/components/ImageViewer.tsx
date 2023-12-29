import { Images } from "@/types/api";

export const ImageViewer = ({ image, zIndex }: { image: Images[0]; zIndex: number }) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-slate-400 grid grid-cols-1"
      style={{
        zIndex,
      }}
    >
      <div className="absolute w-full h-full block">
        <img src={image.fullsize} alt={image.alt} className="absolute inset-0 object-contain w-full h-full z-20" />
        <div className="absolute inset-0 object-cover w-full h-full bg-black opacity-30 z-10"></div>
        <img src={image.fullsize} alt={image.alt} className="absolute inset-0 object-cover w-full h-full blur-sm" />
      </div>
    </div>
  );
};
