import styles from "./HeaderMobile.module.css";
import { useTheme } from "@/context/ThemeContext";
import { UserAvatarMenu } from "./UserAvatarMenu";
import { LocationDisplay } from "./LocationDisplay";
import { HeaderIcons } from "./HeaderIcons";
import { AnimatedCategoryTabs } from "./AnimatedCategoryTabs";
import { useLocation } from "react-router-dom";
import { SearchOverlay } from "@/components/Common/SearchOverlay";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export const HeaderMobile = () => {
  const { themeMode } = useTheme();
  const { currentUser } = useAuth();
  const location = useLocation();
  const isExplorePage = location.pathname === "/explore/events";
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <div
      className={`${styles.container} ${
        isExplorePage
          ? "absolute md:sticky w-full bg-transparent top-0"
          : `${
              themeMode === "light" ? styles.light : styles.dark
            } top-0 w-full md:sticky pb-2 md:pb-0 md:border-b-[0.5px] border-black/5`
      }`}
    >
      <div className="col-span-12 grid grid-cols-12 items-center px-4 py-5 md:px-10 justify-between">
        <UserAvatarMenu />
        {currentUser ? (
          <LocationDisplay />
        ) : (
          <div className="col-span-8 "></div>
        )}
        <HeaderIcons onSearchClick={() => setIsSearchActive(true)} />
      </div>

      <AnimatedCategoryTabs />

      {isSearchActive && (
        <SearchOverlay onClose={() => setIsSearchActive(false)} />
      )}
    </div>
  );
};
