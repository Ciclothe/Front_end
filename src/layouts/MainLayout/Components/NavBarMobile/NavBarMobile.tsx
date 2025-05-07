import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { BiCarousel, BiSolidCarousel } from "react-icons/bi";
import { RiHomeSmile2Fill, RiHomeSmile2Line } from "react-icons/ri";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useCategoryTabs } from "@/context/CategoryTabsContext";
import { NotificationBanner } from "@/components/Common/NotificationBanner";
import { MdNotificationsNone, MdNotifications } from "react-icons/md";
import { HiOutlineChat, HiChat } from "react-icons/hi";
import { ChatsBanner } from "@/components/Common/ChatsBanner";

export const NavBarMobile: React.FC = () => {
  const { themeMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { setShowTabs, setTabs } = useCategoryTabs();
  const [showChats, setShowChats] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);

  const MENU_ITEMS = [
    {
      label: "feed",
      route: "/feed",
      iconFill: RiHomeSmile2Fill,
      iconOutline: RiHomeSmile2Line,
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
    // {
    //   label: "events",
    //   route: "/events",
    //   iconFill: MdHandshake,
    //   iconOutline: MdOutlineHandshake,
    // },
    {
      label: "notifications",
      route: "/notifications",
      iconFill: MdNotifications,
      iconOutline: MdNotificationsNone,
    },
    {
      label: "chats",
      route: "/chats",
      iconFill: HiChat,
      iconOutline: HiOutlineChat,
    },
  ];

  return (
    <>
      <nav
        className={`${
          themeMode === "light" ? "bg-white" : "bg-[#1d1d1d]"
        } sticky bottom-0 left-0 z-10 md:hidden w-full rounded-t-2xl px-2 py-3 flex justify-between items-center`}
        style={{ boxShadow: "0px -10px 10px rgba(0,0,0,0.05)" }}
      >
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.route);
          const Icon = isActive ? item.iconFill : item.iconOutline;

          const handleClick = () => {
            if (item.label === "notifications") {
              setShowNotifications((prev) => !prev);
            } else if (item.label === "chats") {
              setShowChats((prev) => !prev);
            } else {
              setShowTabs(false);
              setTabs([]);
              setShowNotifications(false);
              navigate(item.route);
            }
          };

          return (
            <button
              key={item.label}
              onClick={handleClick}
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
                    className="font-semibold capitalize text-md overflow-hidden whitespace-nowrap"
                  >
                    {t(`mainLayout.${item.label}`)}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>
      {/* Banner de notificaciones */}
      {showNotifications && (
        <NotificationBanner isOpen={setShowNotifications} />
      )}{" "}
      {showChats && <ChatsBanner isOpen={setShowChats} />}
    </>
  );
};
