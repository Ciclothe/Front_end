import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  mdiCards,
  mdiAllInclusive,
  mdiHandshake,
  mdiAccountSupervisor,
} from "@mdi/js";
import Icon from "@mdi/react";

export const CategoryTabs = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  const CategoryTabs = [
    {
      icon: mdiCards,
      name: "all",
      href: "/",
      selected: true,
    },
    {
      icon: mdiAllInclusive,
      name: "swaps",
      href: "/swaps",
      selected: false,
    },
    {
      icon: mdiHandshake,
      name: "events",
      href: "/events",
      selected: false,
    },
    {
      icon: mdiAccountSupervisor,
      name: "communities",
      href: "/communities",
      selected: false,
    },
  ];

  return (
    <div className="flex gap-4 w-full overflow-x-auto scrollbar-none px-2 md:px-0">
      {CategoryTabs.map((tab) => (
        <div
          key={tab.name}
          className={`px-5 rounded-full flex items-center gap-2 font-bold cursor-pointer hover:bg-[rgba(13,188,115,0.1)] hover:text-[#0DBC73] ${
            tab.selected
              ? themeMode === "light"
                ? "bg-[rgba(13,188,115,0.1)] text-[#0DBC73]"
                : "bg-[rgba(13,188,115,0.1)] text-[#0DBC73]"
              : themeMode === "light"
              ? "bg-white border-2 border-white text-black"
              : "bg-[#222423] border-2 border-[#222423] text-white"
          }`}
        >
          <Icon path={tab.icon} size={0.8} />
          <p className="py-2 cursor-pointer">{t(`mainLayout.${tab.name}`)}</p>
        </div>
      ))}
    </div>
  );
};
