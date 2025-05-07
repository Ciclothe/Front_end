import Icon from "@mdi/react";
import { mdiMagnify, mdiCrosshairsGps } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";

export const SearchBar = ({
  ShowLocation = false,
  value,
  onChange,
}: {
  ShowLocation?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { t } = useTranslation();
  const { themeMode } = useTheme();

  return (
    <div
      className={`relative flex w-full rounded-2xl min-h-12 ${
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
        value={value}
        onChange={onChange}
        className={`${
          themeMode === "light"
            ? "bg-white text-black"
            : "bg-[#222423] text-white"
        } pl-12 pr-2 rounded-2xl w-full focus:outline-none placeholder:${
          themeMode === "light" ? "text-black" : "text-white"
        }`}
      />
      {ShowLocation && (
        <div className="bg-[rgba(13,188,115,0.1)] px-4 top-0 h-full rounded-2xl flex items-center justify-center border-2 border-[#0DBC73] gap-10 text-[#0DBC73]">
          <div className="flex flex-col items-start">
            <p className="font-bold">Valencia,Spain</p>
            <p className="text-md">2 Km</p>
          </div>
          <div>
            <Icon path={mdiCrosshairsGps} size={1} />
          </div>
        </div>
      )}
    </div>
  );
};
