interface PostInfoOverlayProps {
  condition: string;
  title: string;
  color: string;
  size: string;
  brand: string;
}

export const PostInfoOverlay = ({
  condition,
  title,
  color,
  size,
  brand,
}: PostInfoOverlayProps) => (
  <div className="absolute bottom-2 left-2 p-3 bg-black/70 rounded-xl text-white text-start">
    <p className="font-semibold text-[#E5D04B]">{condition}</p>
    <p className="text-[1.2em] font-bold">{title}</p>
    <p className="opacity-90 font-semibold text-sm">
      {color} | {size} | {brand}
    </p>
  </div>
);
