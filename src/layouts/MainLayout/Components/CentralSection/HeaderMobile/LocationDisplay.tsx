import { useTheme } from "@/context/ThemeContext";
import { t } from "i18next";
import { useLocation } from "react-router-dom";

export const LocationDisplay = () => {
  const { themeMode } = useTheme();
  const location = useLocation();
  const isExplorePage = location.pathname.startsWith("/explore/events");

  return (
    <div className="col-span-8 md:hidden flex items-center justify-center">
      <div
        className={`${
          isExplorePage
            ? themeMode === "light"
              ? "bg-[#0B0B0B]/10"
              : "bg-white/10"
            : ""
        } ${isExplorePage ? "px-10 py-1 rounded-full backdrop-blur-xs" : ""}`}
      >
        <p className="text-xs opacity-50">{t("mainLayout.location")}</p>
        <p className="font-bold">Valencia, Spain</p>
      </div>
    </div>
  );
};
