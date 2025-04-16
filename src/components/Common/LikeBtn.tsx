import { useState } from "react";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useTheme } from "@/context/ThemeContext";

type LikeButtonProps = {
  liked: boolean;
  onClick: () => void;
};

export const LikeBtn = ({ liked, onClick }: LikeButtonProps) => {
  const [hover, setHover] = useState(false);
  const { themeMode } = useTheme();

  const baseClasses =
    "rounded-full p-2 h-full aspect-square flex items-center justify-center font-bold transition-colors duration-200 cursor-pointer";

  const activeClasses = "bg-[#0dbc732f] text-[#0DBC73]";

  const lightModeClasses = "bg-white md:bg-[#F7F7F7] text-black";

  const darkModeClasses = "bg-[#222423] md:bg-[#121212] text-white";

  const finalClasses = `${baseClasses} ${
    liked || hover
      ? activeClasses
      : themeMode === "light"
      ? lightModeClasses
      : darkModeClasses
  }`;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={finalClasses}
    >
      <Icon path={liked || hover ? mdiHeart : mdiHeartOutline} size={0.8} />
    </div>
  );
};
