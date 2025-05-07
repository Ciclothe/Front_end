import styles from "./HeaderMobile.module.css";
import { useTheme } from "@/context/ThemeContext";
import { UserAvatarMenu } from "./UserAvatarMenu";
import { LocationDisplay } from "./LocationDisplay";
import { HeaderIcons } from "./HeaderIcons";
import { AnimatedCategoryTabs } from "./AnimatedCategoryTabs";
import { Isotipo } from "../../../../../../public/Logos/Isotipo";
import { useNavigate, useLocation } from "react-router-dom";

export const HeaderMobile = () => {
  const { themeMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isExplorePage = location.pathname === "/explore/events";

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
      <div className="col-span-12 grid grid-cols-12 items-center px-2 py-5 md:px-10">
        <UserAvatarMenu />
        <div
          className={`col-span-8 cursor-pointer ${styles.logoCenter}`}
          onClick={() => {
            navigate("/feed", { replace: true });
          }}
        >
          <Isotipo
            color={themeMode === "light" ? "black" : "white"}
            height="2.5em"
          />
        </div>
        <LocationDisplay />
        <HeaderIcons />
      </div>
      <AnimatedCategoryTabs />
    </div>
  );
};
