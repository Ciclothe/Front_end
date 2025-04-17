import { useTranslation } from "react-i18next";
interface PostInfoOverlayProps {
  condition?: string;
  title?: string;
  color?: string;
  size?: string;
  brand?: string;
}
export const PostInfoOverlay = ({
  condition,
  title,
  color,
  size,
  brand,
}: PostInfoOverlayProps) => {
  const { t } = useTranslation();

  return (
    <div className="absolute bottom-2 left-2 p-3 bg-black/70 rounded-xl text-white text-start max-w-[90%] truncate">
      <p className="font-semibold text-[#E5D04B]">
        {t(`mainLayout.${condition}`)}
      </p>
      <p className="text-[1.2em] font-bold truncate">{title}</p>
      <p className="opacity-90 font-semibold text-sm truncate">
        {color} | {size} | {brand}
      </p>
    </div>
  );
};
