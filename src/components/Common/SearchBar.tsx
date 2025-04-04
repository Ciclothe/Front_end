import Icon from "@mdi/react";
import { mdiMagnify, mdiCrosshairsGps } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";

export const SearchBar = () => {
  const { t } = useTranslation();
  const { themeMode } = useTheme();

  return (
    <div
      className={`relative flex w-full rounded-full ${
        themeMode === "light"
          ? "bg-white text-black"
          : "bg-[#222423] text-white"
      }`}
    >
      <Icon
        path={mdiMagnify}
        size={1}
        className={`${
          themeMode === "light" ? "text-black/30" : "text-white/30"
        } absolute left-4 top-1/2 transform -translate-y-1/2`}
      />
      <input
        type="text"
        placeholder={t("mainLayout.search_for")}
        className={`${
          themeMode === "light"
            ? "bg-white text-black"
            : "bg-[#222423] text-white"
        } pl-12 pr-2 rounded-full w-full focus:outline-none placeholder:${
          themeMode === "light" ? "text-black" : "text-white"
        }`}
      />
      <div className="bg-[#0dbc7327] px-4 top-0 h-full rounded-full flex items-center justify-center border-2 border-[#0DBC73] gap-6 text-[#0DBC73]">
        <div className="flex flex-col items-start">
          <p className="font-bold">Valencia,Spain</p>
          <p className="text-sm">2 Km</p>
        </div>
        <div>
          <Icon path={mdiCrosshairsGps} size={1} />
        </div>
      </div>
    </div>
  );
};
