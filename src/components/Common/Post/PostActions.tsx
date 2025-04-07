import Icon from "@mdi/react";
import { mdiAllInclusive, mdiHeart, mdiHeartOutline } from "@mdi/js";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export const PostActions = ({
  liked = false,
  offerSent = false,
}: {
  liked?: boolean;
  offerSent?: boolean;
}) => {
  const [hover, setHover] = useState(false);
  const { themeMode } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <div
        className={`px-5 rounded-full flex items-center gap-2 font-bold hover:bg-[#0DBC73] cursor-pointer ${
          offerSent
            ? "bg-[#0DBC73] text-white"
            : themeMode === "light"
            ? "bg-white md:bg-[#F7F7F7] text-black hover:text-white"
            : "bg-[#222423] md:bg-[#121212] text-white hover:text-black"
        }`}
      >
        <Icon path={mdiAllInclusive} size={0.8} />
        <p className="py-2 cursor-pointer">Swap</p>
      </div>

      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`rounded-full p-2 h-full aspect-square flex items-center justify-center font-bold transition-colors duration-200 cursor-pointer border-2 ${
          liked || hover
            ? "bg-[#0dbc732f] border-[#0DBC73] text-[#0DBC73]"
            : themeMode === "light"
            ? "bg-white md:bg-[#F7F7F7] text-black border-[#F7F7F7]"
            : "bg-[#222423] md:bg-[#121212] text-white border-[#121212]"
        }`}
      >
        <Icon path={liked || hover ? mdiHeart : mdiHeartOutline} size={0.8} />
      </div>
    </div>
  );
};
