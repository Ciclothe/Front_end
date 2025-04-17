import { useState } from "react";
import { mdiBikeFast, mdiHeartBroken, mdiAllInclusive } from "@mdi/js";
import Icon from "@mdi/react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

type OfferBtnProps = {
  offerSent: boolean;
  onClick: () => void;
};

export const OfferBtn = ({ offerSent, onClick }: OfferBtnProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  const handleClick = () => {
    onClick();
  };

  const getClasses = () => {
    if (offerSent) {
      return themeMode === "light"
        ? "bg-[#0DBC73] text-white hover:bg-[rgba(188,13,13,0.1)] hover:text-[#bc0d0d] hover:border-[#bc0d0d]"
        : "bg-[#0DBC73] text-black hover:bg-[rgba(188,13,13,0.1)] hover:text-[#bc0d0d] hover:border-[#bc0d0d]";
    } else {
      return `bg-[rgba(13,188,115,0.1)] text-[#0DBC73] border-[#0DBC73] 
              hover:bg-[#0DBC73] 
              ${
                themeMode === "light" ? "hover:text-white" : "hover:text-black"
              }`;
    }
  };

  return (
    <div
      className={`px-5 w-full rounded-full flex items-center justify-center gap-2 font-bold cursor-pointer ${getClasses()}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      <Icon
        path={
          offerSent
            ? isHovering
              ? mdiHeartBroken
              : mdiBikeFast
            : mdiAllInclusive
        }
        size={0.8}
      />
      <p className="py-2 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis">
        {offerSent
          ? isHovering
            ? t("mainLayout.cancel_offer")
            : t("mainLayout.offer_sent")
          : t("mainLayout.offer_swap")}
      </p>
    </div>
  );
};
