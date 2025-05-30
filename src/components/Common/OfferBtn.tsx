import { useState } from "react";
import { mdiBikeFast, mdiHeartBroken } from "@mdi/js";
import Icon from "@mdi/react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { PiSwapFill } from "react-icons/pi";

type OfferBtnProps = {
  offerSent: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const OfferBtn = ({ offerSent, onClick }: OfferBtnProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick(e);
  };

  const getClasses = () => {
    if (offerSent) {
      return themeMode === "light"
        ? "bg-[#0DBC73] text-white hover:bg-[rgba(188,13,13,0.1)] hover:text-[#bc0d0d]"
        : "bg-[#0DBC73] text-black hover:bg-[rgba(188,13,13,0.1)] hover:text-[#bc0d0d]";
    } else {
      return `bg-[rgba(13,188,115,0.1)] text-[#0DBC73] border-[#0DBC73] 
              hover:bg-[#0DBC73] 
              ${
                themeMode === "light" ? "hover:text-white" : "hover:text-black"
              }`;
    }
  };

  const renderIcon = () => {
    if (offerSent) {
      return (
        <Icon path={isHovering ? mdiHeartBroken : mdiBikeFast} size={0.8} />
      );
    } else {
      return <PiSwapFill size={18} />;
    }
  };

  return (
    <div
      className={`px-5 py-3 rounded-xl w-full rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer ${getClasses()}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={(e) => {
        e.stopPropagation();
        handleClick(e);
      }}
    >
      {renderIcon()}
      <p className="cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis">
        {offerSent
          ? isHovering
            ? t("mainLayout.cancel_offer")
            : t("mainLayout.offer_sent")
          : t("mainLayout.offer_swap")}
      </p>
    </div>
  );
};
