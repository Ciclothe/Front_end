import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdHandshake,
  MdOutlineHandshake,
  MdOutlineExplore,
  MdExplore,
} from "react-icons/md";
import { GoHomeFill, GoHome } from "react-icons/go";
import { BiCarousel, BiSolidCarousel } from "react-icons/bi";
import {
  IoChatbubbleEllipsesSharp,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useCategoryTabs } from "@/context/CategoryTabsContext";

export const NavBarMobile: React.FC = () => {
  const { themeMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { setShowTabs, setTabs } = useCategoryTabs();

  const menuItems = [
    {
      label: "feed",
      route: "/feed",
      iconFill: GoHomeFill,
      iconOutline: GoHome,
    },
    {
      label: "swipes",
      route: "/swipes",
      iconFill: BiSolidCarousel,
      iconOutline: BiCarousel,
    },
    {
      label: "explore",
      route: "/explore",
      iconFill: MdExplore,
      iconOutline: MdOutlineExplore,
    },
    {
      label: "events",
      route: "/events",
      iconFill: MdHandshake,
      iconOutline: MdOutlineHandshake,
    },
    {
      label: "chats",
      route: "/chats",
      iconFill: IoChatbubbleEllipsesSharp,
      iconOutline: IoChatbubbleEllipsesOutline,
    },
  ];

  return (
    <nav
      className={`${
        themeMode === "light" ? "bg-white" : "bg-[#1d1d1d]"
      } col-span-12 sticky bottom-0 left-0 w-full rounded-t-2xl px-2 py-3 flex justify-between items-center z-10 md:hidden`}
      style={{ boxShadow: "0px -10px 10px rgba(0,0,0,0.05)" }}
    >
      {menuItems.map((item) => {
        const isActive = location.pathname === item.route;
        const Icon = isActive ? item.iconFill : item.iconOutline;

        return (
          <button
            key={item.label}
            onClick={() => {
              setShowTabs(false);
              setTabs([]);
              navigate(item.route);
            }}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-full transition-all duration-300 ${
              isActive ? "flex-[1.5]" : "flex-1"
            } ${
              isActive
                ? themeMode === "light"
                  ? "bg-[#F7F7F7] text-black"
                  : "bg-[#232524] text-white"
                : themeMode === "light"
                ? "text-black/40"
                : "text-white/40"
            }`}
          >
            <Icon size={25} />
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.span
                  key={item.label}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-semibold capitalize text-sm overflow-hidden whitespace-nowrap"
                >
                  {t(`mainLayout.${item.label}`)}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </nav>
  );
};
