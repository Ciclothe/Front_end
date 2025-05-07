import { useTranslation } from "react-i18next";
import { conditionColors } from "@/components/Utils/format";

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
  const conditionColor = condition
    ? conditionColors[condition] ?? "#E5D04B"
    : "#E5D04B";

  return (
    <div className="absolute bottom-2 left-2 p-3 z-1 bg-black/40 backdrop-blur-md rounded-xl text-white text-start max-w-[95%] truncate">
      <p className="font-semibold" style={{ color: conditionColor }}>
        {t(`mainLayout.${condition}`)}
      </p>
      <p className="text-[1.2em] font-bold truncate">{title}</p>
      <p className="opacity-90 font-semibold text-sm truncate">
        {color} | {size} | {brand}
      </p>
    </div>
  );
};
